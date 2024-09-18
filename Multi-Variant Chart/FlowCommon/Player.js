// V5
class Player {
  /**
   * @constructor
   *
   * @param {Timeline} timeline
   *  Animation played when the transition is triggered.
   *
   * @param {String} timer
   *  The HTML Element or the HTML Element ID to be used for handling the timer (i.e. timing animation) of `self`.
   *
   * @param {Boolean} loop
   *  This property specifies that the animation should repeat upon completion.
   *
   * @param {Boolean} delay
   *  The number of milliseconds to delay the start of playback.
   *
   * @param {function: () -> Void} callback
   * A callback function passed to the player that runs upon animation completion.
   * This callback does not take in any parameters.
   */
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
    
    // Play the animation automatically after setting the timeline
    setTimeout(() => this.play(), this.delay || 0);
  }

  /**
   * @return {Timeline}
   * Returns the current timeline for `self`.
   */
  get timeline() {
    return this._timeline;
  }

  /**
   * @set
   * Sets the timeline of `self` to `timeline`. When this variable is set, the player pauses playback then sets the new value. If the new value is `null` the current timing animation is removed, and default values are set in anticipation of a new timeline. If the new value is not `null` the timeline is prepped for playback.
   *
   * @param {Timeline} timeline
   * The timeline to be controlled by `self`.
   *
   */
  set timeline(timeline) {
    this.cancelAnimations();

    if (this._timeline != null) {
      this.pause();
    }

    this._timeline = timeline;

    if (this._timeline === null) {
      this.timingAnimation = null;
      this.currentTime = 0;
      this.shouldPlay = false;
    } else {
      this.timingAnimation = this.timer.animate({}, this.timeline.duration + this.delay);
      this.timingAnimation.currentTime = 0;
      this.timingAnimation.pause();

      this.timeline.loadFillImages();
      this.timeline.loadSVGAnimations();
      this.animations = this.timeline.createAllAnimations();

      this.shouldPlay = true;
      this.pause();
      this.setOnFinishCallback();
    }
  }

  /**
   * @return {Number}
   * Returns the duration of the `timeline` of `self`, or `0` if timeline is `null`.
   */
  get duration() {
    return this.timeline === null ? 0 : this.timeline.duration;
  }

  /**
   * @return {Number}
   * Returns the current playback time of `self`, or `0` if `timeline` is `null`.
   */
  get currentTime() {
    return this.timingAnimation === null ? 0 : this.timingAnimation.currentTime;
  }

  /**
   * @set
   * Sets the current playback time (in milliseconds) of `self`. This value is propagated to all animations in the current timeline.
   *
   * @param {Number} time
   * A numeric value representing time in milliseconds.
   */
  set currentTime(time) {
    if (this.timeline === null || this.timingAnimation === null) {
      return;
    }

    this.animations.forEach((animation) => {
      animation.currentTime = time;
    });

    this.timeline.allShapes.forEach((shape) => {
      shape.setCurrentTime(time / 1000);
    });

    this.timingAnimation.currentTime = time;
  }

  /**
   * Work around for Safari. When switching from one timeline to
   * another Safari will jump to a random point in the first
   * timeline unless the effect target of each animation is set to null.
   */
  cancelAnimations() {
    if (this.animations === undefined || this.animations === null) { return; }
    this.animations.forEach((animation) => {
      animation.effect.target = null;
    });
    this.animations = [];
  }

  /**
   * Plays the current timeline for `self`. If the player is currently playing, or the current timeline is `null` this function does nothing.
   */
  play() {
    if (this.timeline == null || this.isPlaying() === true) {
      return;
    }

    this.timingAnimation.play();
    this.animations.forEach((animation) => {
      animation.play();
    });

    this.timeline.allShapes.forEach((shape) => {
      const t = shape.getCurrentTime() % this.timeline.duration;
      shape.setCurrentTime(t);
      shape.unpauseAnimations();
    });
  }

  /**
   * @return {Boolean}
   * Returns true if self is currently playing an animation and false otherwise.
   */
  isPlaying() {
    if (this.timingAnimation == null) {
      return false;
    }
    return this.timingAnimation.playState === 'running';
  }

  /**
   * Pauses the animation being played by self.
   */
  pause() {
    if (this.timeline === null || this.timingAnimation === null) {
      return;
    }

    this.timingAnimation.pause();
    this.animations.forEach((animation) => {
      animation.pause();
    });
    this.timeline.allShapes.forEach((shape) => {
      shape.pauseAnimations();
    });
  }

  /**
   * Stops the animation.
   */
  stop() {
    this.shouldPlay = false;
    this.pause();
    this.currentTime = 0;
  }

  /**
   * Sets the callback function that will be run at the end of each animation.
   */
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
      if (typeof this.callback != undefined && this.callback != null) this.callback();
    };
  }

  /**
   * Converts a numeric value representing a time in milliseconds into a string.
   */
  static convertTimeToString(milliseconds) {
    const date = new Date(null);
    date.setMilliseconds(milliseconds);
    return date.toISOString().substr(14, 8);
  }
}

// eslint-disable-next-line no-unused-vars
function createPlayer(
  Timeline,
  timerID,
  loop,
  delay,
  callback,
  rootID,
  elementID,
  resourcesPath
) {
  const shadowDomContainer = document.getElementById(rootID);
  const { shadowRoot } = shadowDomContainer;
  const timer = shadowRoot.getElementById(timerID);
  const forwardTimeline = new Timeline(shadowRoot, elementID, resourcesPath);
  const player = new Player(forwardTimeline, timer, loop, delay, callback);

  // Create an Intersection Observer to trigger the play when the .impact element is 80% in view
  const impactElement = document.querySelector('.impact__chart-inner-container');
  
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Element is at least 80% in view, start the animation
          player.play();
  
          // Optionally, unobserve the element after triggering play so it doesn't keep checking
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.8, // 80% of the element needs to be visible to trigger the play
    }
  );
  
  // Start observing the .impact element
  observer.observe(impactElement);

  return player;
}
