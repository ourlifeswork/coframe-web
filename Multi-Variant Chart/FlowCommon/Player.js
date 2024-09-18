// V18

// Function to animate the appearance of each .variant element in sequence
function animateVariants() {
  // Select all elements with the class .variant
  const variants = document.querySelectorAll('.variant');

  // Set initial opacity to 0 for all variants
  variants.forEach((variant) => {
    variant.style.opacity = '0';
  });

  // Loop through each variant and apply a staggered delay
  variants.forEach((variant, index) => {
    // Delay each variant's animation by 250ms * index
    setTimeout(() => {
      variant.classList.add('fade-in'); // Add the fade-in class to trigger the animation
    }, index * 250); // Each element appears 250ms after the last one
  });
}

// Player class implementation
class Player {
  constructor(timeline, timer, loop = false, delay, callback) {
    this.delay = delay;

    // Ensure the timer is an HTML element or ID
    if (typeof timer === 'string' || timer instanceof String) {
      this.timer = document.getElementById(timer);
    } else {
      this.timer = timer;
    }

    // Check if the timer element is found
    if (!this.timer) {
      console.error("Error: Timer element not found or invalid.");
      return;
    }

    this.loop = loop;
    this.timeline = timeline;
    this.callback = callback;
    this.setOnFinishCallback();

    // Initialize the animations array
    this.animations = [];

    // Automatically wait for the element to be fully in view before playing
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const timerElement = this.timer;
    if (!timerElement) {
      console.error("Error: Timer element not found.");
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          // Check if the element is fully visible
          if (entry.isIntersecting && entry.intersectionRatio === 1) {
            this.play();

            // Stop observing once the animation is triggered
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 1.0, // 100% visibility required to trigger the play
      }
    );

    // Observe the timer element
    observer.observe(timerElement);
  }

  play() {
    // Ensure the timeline and animations are defined before playing
    if (this.timeline == null || this.isPlaying() === true) {
      return;
    }

    // Check if timingAnimation is defined
    if (!this.timingAnimation) {
      this.initializeTimingAnimation(); // Try to initialize it
    }

    // Check again if timingAnimation is defined after initialization
    if (!this.timingAnimation) {
      console.error("Error: timingAnimation is still undefined after initialization.");
      return;
    }

    // Play the timing animation if it exists
    this.timingAnimation.play();

    // Initialize the animations if they haven't been set yet
    if (!this.animations || this.animations.length === 0) {
      this.initializeAnimations();
    }

    // Check if animations are defined and not empty
    if (!this.animations || this.animations.length === 0) {
      console.error("Error: animations array is still undefined or empty after initialization.");
      return;
    }

    // Play each animation in the array
    this.animations.forEach((animation) => {
      animation.play();
    });

    // Unpause shapes in the timeline
    this.timeline.allShapes.forEach((shape) => {
      const t = shape.getCurrentTime() % this.timeline.duration;
      shape.setCurrentTime(t);
      shape.unpauseAnimations();
    });

    // Trigger the staggered animation for the .variant elements
    animateVariants();
  }

  initializeTimingAnimation() {
    // Ensure the timer element exists and the timeline duration is valid
    if (this.timer && this.timeline && this.timeline.duration) {
      this.timingAnimation = this.timer.animate({}, this.timeline.duration + this.delay);
      this.timingAnimation.currentTime = 0;
      this.timingAnimation.pause();
    } else {
      console.error("Error: Unable to initialize timingAnimation. Timer or timeline is invalid.");
    }
  }

  initializeAnimations() {
    // Ensure that the timeline has the method createAllAnimations and returns valid animations
    if (this.timeline && typeof this.timeline.createAllAnimations === 'function') {
      this.animations = this.timeline.createAllAnimations();
      if (!this.animations || this.animations.length === 0) {
        console.error("Error: No animations created by timeline.");
      }
    } else {
      console.error("Error: timeline does not have a createAllAnimations function or it returned no animations.");
    }
  }

  isPlaying() {
    if (this.timingAnimation == null) {
      return false;
    }
    return this.timingAnimation.playState === 'running';
  }

  setOnFinishCallback() {
    if (this.timingAnimation == null) {
      return;
    }
    this.timingAnimation.onfinish = () => {
      if (this.loop === true) {
        this.currentTime = 0;
        this.play(); // Automatically replay on finish
      } else {
        this.pause();
      }
      if (typeof this.callback != undefined && this.callback != null) {
        this.callback();
      }

      // Trigger the staggered animation for the .variant elements
      animateVariants();
    };
  }
}

// Example function to create a Player instance (if needed)
function createPlayer(Timeline, timerID, loop, delay, callback, rootID, elementID, resourcesPath) {
  const shadowDomContainer = document.getElementById(rootID);
  const { shadowRoot } = shadowDomContainer;
  const timer = shadowRoot.getElementById(timerID);
  const forwardTimeline = new Timeline(shadowRoot, elementID, resourcesPath);

  return new Player(forwardTimeline, timer, loop, delay, callback);
}
