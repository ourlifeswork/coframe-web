// V3

/**
 * A `Driver` is a user-interface for creating a Player and controlling its playback.
 * In addition to passing a `Timeline` and a `Timer` as you would with a `Player`, you must also provide DOM elements for the following UI components:
 * - a play/pause button
 * - a loop button (toggles)
 * - a label to display the current playback time
 * - a slider
 */
class Driver {
  constructor(timeline, loopID, playPauseID, sliderID, timeLabelID, timer) {
    // Associate driver components with variables
    this.slider = document.getElementById(sliderID);
    this.animationTime = document.getElementById(timeLabelID);
    this.playPauseButton = document.getElementById(playPauseID);
    this.loopButton = document.getElementById(loopID);
    this.timer = timer;

    // Ensure elements exist
    if (!this.slider || !this.animationTime || !this.playPauseButton || !this.loopButton) {
      console.error('One or more DOM elements are missing');
      return;
    }

    // Create a player
    this.player = new Player(timeline, timer, false, 0);

    if (!this.player) {
      console.error('Player could not be initialized');
      return;
    }

    this.interval = setInterval(() => {
      this.updateSliderIfAnimating();
    }, 100 / 3);
    this.createControlFunctions();
  }

  // Returns the timeline from the player
  get timeline() {
    return this.player.timeline;
  }

  // Sets the timeline from the player
  set timeline(timeline) {
    this.player.timeline = timeline;
  }

  // Returns the duration of the timeline from the player
  get duration() {
    return this.player.duration;
  }

  // Returns the current time from the player
  get currentTime() {
    return this.player.currentTime;
  }

  // Sets the current time for the player, updates the position of the slider
  set currentTime(time) {
    if (this.slider) {
      this.slider.value = time / this.duration;
    }
    this.player.currentTime = time;
  }

  // Updates the position of the timer if the player is currently playing
  updateSliderIfAnimating() {
    // The player could be one of `idle`, `running`, `paused`, or `finished`
    // We want to update in any state other than `paused`
    if (this.player.timingAnimation && this.player.timingAnimation.playState !== "paused") {
      this.sliderValue = this.currentTime / this.timeline.duration;
      this.setAnimationTimeLabels(this.currentTime);
    }
  }

  // Initiates playback, starts the interval for updating the slider
  play() {
    if (!this.player) {
      console.error('Player is not initialized');
      return;
    }

    this.interval = setInterval(() => {
      this.updateSliderIfAnimating();
    }, 100 / 3);
    this.player.play();
  }

  // Returns true if the player is currently playing
  isPlaying() {
    return this.player && this.player.isPlaying();
  }

  // Pauses playback, clears the interval to stop updating the slider
  pause() {
    if (this.player) {
      clearInterval(this.interval);
      this.player.pause();
    } else {
      console.error('Player is not initialized');
    }
  }

  // Ends playback, resets the current time to `0`
  stop() {
    if (!this.player) {
      console.error('Player is not initialized');
      return;
    }

    // set the state for the play/pause button
    this.playPauseButton.checked = false;
    this.shouldPlay = false;
    this.pause();

    let d = this.duration;
    this.setAnimationTimeLabels(d);
    this.sliderValue = d / this.timeline.duration - 0.001;
  }

  // Toggles playback when the play/pause button is clicked
  togglePlayback() {
    if (this.playPauseButton.checked) {
      this.shouldPlay = true;
      if (
        this.player.timingAnimation.playState === "finished" ||
        this.currentTime === this.timeline.duration
      ) {
        this.currentTime = 0;
      }
      this.play();
    } else {
      this.shouldPlay = false;
      this.pause();
    }
  }

  //------------------
  // interface updates
  //------------------

  // Associates the UI components with actions
  createControlFunctions() {
    this.playPauseButton.onchange = () => {
      this.togglePlayback();
    };

    this.player.timingAnimation.onfinish = () => {
      if (this.loopButton.checked) {
        this.currentTime = 0;
      } else {
        this.stop();
      }
    };

    // Link the slider with input actions
    this.slider.oninput = () => {
      this.pause();

      var newTime = this.slider.value * this.duration;
      this.setAnimationTimeLabels(newTime);

      var newTime = Math.min(newTime, this.duration - 1);

      this.currentTime = newTime;
    };

    this.slider.onchange = () => {
      if (this.shouldPlay) {
        this.play();
      }
    };
  }

  setAnimationTimeLabels(value) {
    this.animationTime.innerHTML = Driver.convertTimeToString(value);
  }

  get sliderValue() {
    return this.slider.value;
  }

  set sliderValue(value) {
    if (this.slider) {
      this.slider.value = value;
    } else {
      console.error('Slider element is missing');
    }
  }

  //---------------
  // helper methods
  //---------------

  static convertTimeToString(milliseconds) {
    var truncatedMilliseconds = Math.floor(
      Math.floor(milliseconds % 1000, 0) / 10,
      2
    );
    var seconds = Math.floor(milliseconds / 1000, 0);
    var timeString = seconds + "";
    if (truncatedMilliseconds !== 0) {
      timeString += ".";
      if (truncatedMilliseconds < 10) {
        timeString += "0";
      }
      timeString += truncatedMilliseconds;
    }
    return timeString + " s";
  }
}
