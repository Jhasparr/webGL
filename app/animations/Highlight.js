import Animation from '../classes/Animations'
import GSAP from 'gsap'
import { calculate, split } from '../utils/text'

export default class Highlight extends Animation {
  constructor ({ element, elements }) {
    super({ element, elements })

    this.elementLinesSpans = split({ element: this.element, append: true })
  }

  animateIn () {
    this.timelineIn = GSAP.timeline({
      delay: 0.5
    })
    this.timelineIn.fromTo(this.element, {
      autoAlpha: 0,
      scale: 1.2

    }, {
      autoAlpha: 1,
      ease: 'expo.out',
      duration: 1.5,
      scale: 1
    })
  }

  animateOut () {
    GSAP.set(this.element, {
      autoAlpha: 0
    })
  }

  onResize () {
    this.elementsLines = calculate(this.elementLinesSpans)
  }
}
