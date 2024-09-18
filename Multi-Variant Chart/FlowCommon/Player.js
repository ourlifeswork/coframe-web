// V15

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

    this.loop = loop;
    this.timeline = timeline;
    this.callback = callback;
    this.setOnFinishCallback();

    // Automatically wait for the element to be fully in view before playing
    this.setupIntersectionObserver();
  }

  setupIntersectionObserver() {
    const timerElement = this.timer;
    if (!timerElement) {
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
      console.error("Error: timingAnimation is undefined");
      return;
    }

    // Play the timing animation if it exists
    this.timingAnimation.play();

    // Check if animations are defined
    if (!this.animations || this.animations.length === 0) {
      console.error("Error: animations array is undefined or empty");
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
