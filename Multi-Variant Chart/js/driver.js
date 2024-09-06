/**
 * A `Driver` is a user-interface for creating a Player and controlling its playback.
 * In addition to passing a `Timeline` and a `Timer` as you would with a `Player`, you must also provide DOM elements for the following UI components:
 * - a play/pause button
 * - a loop button (toggles)
 * - a label to display the current playback time
 * - a slider
 */
class Driver {
  // Constructs a player, stores provided DOM elements as variables, creates an interval for updating the time and slider.
  constructor(timeline, loopID, playPauseID, sliderID, timeLabelID, timer) {
    // Associate driver components with variables
    this.slider = document.getElementById(sliderID);
    this.animationTime = document.getElementById(timeLabelID);
    this.playPauseButton = document.getElementById(playPauseID);
    this.loopButton = document.getElementById(loopID);
    this.timer = timer;

    // Create a player
    this.player = new Player(timeline, timer, false, 0);
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
    this.slider.value = time / this.duration;
    this.player.currentTime = time;
  }

  // Updates the position of the timer if the player is currenty playing
  updateSliderIfAnimating() {
    // The player could be one of `idle`, `running`, `paused`, or `finished`
    // We want to update in any stae other than `running`
    if (this.player.timingAnimation.playState != "paused") {
      this.sliderValue = this.currentTime / this.timeline.duration;
      this.setAnimationTimeLabels(this.currentTime);
    }
  }

  // Initiates playback, starts the interval for updating the slider
  play() {
    this.interval = setInterval(() => {
      this.updateSliderIfAnimating();
    }, 100 / 3);
    this.player.play();
  }

  // Returns true if the player is currently playing
  isPlaying() {
    return this.player.isPlaying();
  }

  // Pauses playback, clears the interval to stop updating the slider
  pause() {
    clearInterval(this.interval);
    this.player.pause();
  }

  // Ends playback, resets the current time to `0`
  stop() {
    // set the state for the play/pause button
    this.playPauseButton.checked = false;
    // store whether or not the driver should automatically continue playback 
    this.shouldPlay = false;
    this.pause();

    let d = this.duration;
    this.setAnimationTimeLabels(d);
    this.sliderValue = d / this.timeline.duration - 0.001;
  }

  // The action associated with the play/pause button.
  // Triggers playback if paused. Pauses the animation if it is playing.
  // If playback is triggered, and the animation has already finished, it resets the animation to `0` before triggering playback.
  togglePlayback() {
    if (this.playPauseButton.checked) {
      this.shouldPlay = true;
      if (
        this.player.timingAnimation.playState == "finished" ||
        this.currentTime == this.timeline.duration
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

  // Associates the UI components with actions above.
  createControlFunctions() {
    // Link the play/pause button
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
      // Always pause the animation when interacting with the slider
      this.pause();

      // Calculate and update the time based on slider position
      var newTime = this.slider.value * this.duration;
      this.setAnimationTimeLabels(newTime);

      // Select the smaller of the current time. 
      // Or, if the slider is at its rightmost limit (i.e. the end of the animation) set the current time to 1 millisecond shorter than `duration`. 
      var newTime = Math.min(newTime, this.duration - 1);

      // Set the new time
      this.currentTime = newTime;
    };

    // Link the slider to logic for triggering playback
    this.slider.onchange = () => {
      // If the slider was interacted with while it was playing, resume playback after releasing the slider.
      if (this.shouldPlay) {
        this.play();
      }
    };
  }

  // Sets the current time label
  setAnimationTimeLabels(value) {
    this.animationTime.innerHTML = Driver.convertTimeToString(value);
  }

  // Gets the current value of the slider
  get sliderValue() {
    return this.slider.value;
  }

  // Sets the current value of the slider
  set sliderValue(value) {
    this.slider.value = value;
  }

  //---------------
  // helper methods
  //---------------

  // Converts the current time, in milliseconds, to a readable string representing minutes and seconds
  static convertTimeToString(milliseconds) {
    var truncatedMilliseconds = Math.floor(
      Math.floor(milliseconds % 1000, 0) / 10,
      2
    );
    var seconds = Math.floor(milliseconds / 1000, 0);
    var timeString = seconds + "";
    if (truncatedMilliseconds != 0) {
      timeString += ".";
      if (truncatedMilliseconds < 10) {
        timeString += "0";
      }
      timeString += truncatedMilliseconds;
    }
    return timeString + " s";
  }
}
