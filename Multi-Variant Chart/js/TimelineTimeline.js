/**
* Class representing the TimelineTimeline timeline.
*
* Made with Flow
*/

class TimelineTimeline {
    /**
    * @constructor
    *
    * @param {HTMLElement} rootElement
    *   Root Element of the DOM containing the elements that will be animated in this timeline.
    *
    * @param {String} resourcesPath
    *   The path pointing to the root of the Timeline folder.
    */
    constructor(rootElement, elementID, resourcesPath) {
        this.rootElement = rootElement;
        this.elementID = elementID;
        this.resourcesPath = resourcesPath;
        this.imagesFolderPath = resourcesPath + "/img";
        this.loadFillImages();
    }

    /**
    * Returns the timeline's duration in milliseconds.
    */
    get duration() { return 10000 }

	loadFillImages() {
        let pattern;
	}
  
    loadSVGAnimations() {
        this.loadSVGShapeAnimations()
        this.loadSVGShapeMaskAnimations()
    }

    loadSVGShapeAnimations() {
        // Path Animations
        let path;
        path = this.rootElement.getElementById("mask_1-path")
        path.d = "M0,450c0,0,1280,0,1280,0 0,0,0,-450,0,-450 0,0,-1280,0,-1280,0 0,0,0,450,0,450zM0,450"
        path.innerHTML = `
                <animate
                  attributeName="d"
                  values="M0,450c0,0,1280,0,1280,0 0,0,0,-450,0,-450 0,0,-1280,0,-1280,0 0,0,0,450,0,450zM0,450;M0,450c0,0,218.84,0,218.84,0 0,0,0,-450,0,-450 0,0,-218.84,0,-218.84,0 0,0,0,450,0,450zM0,450"
                  dur="10s"
                  fill="freeze"
                  calcMode="spline"
                  keyTimes="0;1"
                  keySplines="0.42 0 0.58 1"
                />
 `

        // Gradient Animations
        let defs;
    } 

    loadSVGShapeMaskAnimations() {    } 

    /**
    * @return
    * Returns the list of svg shapes that are animated in this timeline.
    */
    get allShapes() {
        return [
            this.rootElement.querySelector(`${this.elementID} .confidence_interval-svg`),
            this.rootElement.querySelector(`${this.elementID} .baseline_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .green_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_2-svg`),
            this.rootElement.querySelector(`${this.elementID} .teal_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_3-svg`),
            this.rootElement.querySelector(`${this.elementID} .purple_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_4-svg`),
            this.rootElement.querySelector(`${this.elementID} .yellow_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_5-svg`),
            this.rootElement.querySelector(`${this.elementID} .red_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_6-svg`),
            this.rootElement.querySelector(`${this.elementID} .brown_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_7-svg`),
            this.rootElement.querySelector(`${this.elementID} .orange_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_8-svg`),
            this.rootElement.querySelector(`${this.elementID} .pink_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .confidence_interval_9-svg`),
            this.rootElement.querySelector(`${this.elementID} .blue_variant_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .mask_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .marker-svg`),
            this.rootElement.querySelector(`${this.elementID} .outer_circle-svg`),
            this.rootElement.querySelector(`${this.elementID} .inner_circle-svg`),
            this.rootElement.querySelector(`${this.elementID} .outer_circle_1-svg`),
            this.rootElement.querySelector(`${this.elementID} .inner_circle_1-svg`),
        ]
    }

    mask_1_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .mask_1`);
        return element.animate({
            left: ['-0.15px', '1061px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    mask_1_widthTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .mask_1`);
        return element.animate({
            width: ['1280px', '218.84px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    marker_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .marker`);
        return element.animate({
            left: ['-1.5px', '1060.5px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    winning_variant_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .winning_variant`);
        return element.animate({
            left: ['-1px', '1061.5px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    winning_variant_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .winning_variant`);
        return element.animate({
            top: ['326px', '323px', '313px', '307px', '297px', '293px', '296px', '299px', '294px', '292px', '286px', '284px', '284px', '277px', '275px', '274px', '278px', '280px', '268px'],
            easing: ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"],
            offset: [0, 0.586, 0.6, 0.62, 0.63, 0.639, 0.656, 0.669, 0.679, 0.688, 0.705, 0.747, 0.765, 0.781, 0.794, 0.808, 0.83, 0.861, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    winning_variant_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .winning_variant`);
        return element.animate({
            opacity: [0, 0, 1, 1],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.573, 0.582, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    base_line_variant_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .base_line_variant`);
        return element.animate({
            left: ['-1px', '-8.5px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    base_line_variant_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .base_line_variant`);
        return element.animate({
            top: ['385px', '384px', '385px', '384px', '383px', '384px', '384px', '381px', '380px', '383px', '384px', '381px', '381px', '385px', '388px', '387px', '389px', '387px', '387px', '381px', '379px', '381px', '385px', '388px', '386.5px', '389px', '389px', '388px', '383px', '376px', '377px', '378px', '387px', '389px', '385px', '378px', '382px', '390px', '388px', '388px', '390px', '388px', '386px', '387px', '392px', '391px', '383px', '383px', '389px', '389px', '388px', '389px', '387px', '386px', '386px'],
            easing: ["ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out", "ease-in-out"],
            offset: [0, 0.02, 0.06, 0.08, 0.1, 0.12, 0.16, 0.18, 0.2, 0.22, 0.228, 0.24, 0.249, 0.26, 0.28, 0.286, 0.3, 0.32, 0.331, 0.34, 0.348, 0.355, 0.36, 0.38, 0.4, 0.406, 0.42, 0.44, 0.46, 0.47, 0.48, 0.489, 0.5, 0.54, 0.56, 0.572, 0.58, 0.6, 0.613, 0.62, 0.64, 0.66, 0.68, 0.713, 0.73, 0.745, 0.76, 0.78, 0.8, 0.82, 0.839, 0.86, 0.9, 0.92, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    base_line_variant_opacityTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .base_line_variant`);
        return element.animate({
            opacity: [0, 0, 1, 1],
            easing: ["linear", "ease-in-out", "ease-in-out"],
            offset: [0, 0.043, 0.07, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    outer_circle_1_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .outer_circle_1`);
        return element.animate({
            left: ['0px', '1070px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    outer_circle_1_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .outer_circle_1`);
        return element.animate({
            top: ['0px', '-3px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    inner_circle_1_leftTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .inner_circle_1`);
        return element.animate({
            left: ['9px', '1079px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }
    inner_circle_1_topTrack() {
        const element = this.rootElement.querySelector(`${this.elementID} .inner_circle_1`);
        return element.animate({
            top: ['9px', '6px'],
            easing: ["ease-in-out"],
            offset: [0, 1],
          },
          {
            duration: this.duration,
            composite: TimelineTimeline.composite.REPLACE,
            fill: TimelineTimeline.fill.FORWARDS
          }
        )
    }

        /**
        * Creates and returns all animations for this timeline.
        */
        createAllAnimations() {
            return [
                this.mask_1_leftTrack(),
                this.mask_1_widthTrack(),
                this.marker_leftTrack(),
                this.winning_variant_leftTrack(),
                this.winning_variant_topTrack(),
                this.winning_variant_opacityTrack(),
                this.base_line_variant_leftTrack(),
                this.base_line_variant_topTrack(),
                this.base_line_variant_opacityTrack(),
                this.outer_circle_1_leftTrack(),
                this.outer_circle_1_topTrack(),
                this.inner_circle_1_leftTrack(),
                this.inner_circle_1_topTrack(),
            ].flat()
        }
}

// https://developer.mozilla.org/en-US/docs/Web/API/KeyframeEffect/composite
    TimelineTimeline.composite = {
        ADD: 'add',
        REPLACE: 'replace',
        ACCUMULATE: 'accumulate',
    }

// https://developer.mozilla.org/en-US/docs/Web/API/EffectTiming/fill
    TimelineTimeline.fill = {
        NONE: 'none',
        FORWARDS: 'forwards',
        BACKWARDS: 'backwards',
        BOTH: 'both',
        AUTO: 'auto',
    }

Object.freeze(TimelineTimeline)
