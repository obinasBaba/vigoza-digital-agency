// noinspection DuplicatedCode

import { EventEmitter } from 'events'
import { distance, lerp } from './utils'
import EventUtil from './EventUtil'
import { object } from 'prop-types'
import gsap from 'gsap'

// Calculate the viewport size

type MagnetType = {
  element: HTMLElement
  stop?: number
  distance?: number,
  onLeave?: () => void
}

export default class MagnetElement extends EventEmitter{
  events;
  element: HTMLElement
  rect: DOMRect

  distanceToStop: number
  stop: number = 1
  distance: number = 0.32
  renderedStyles = {
    x: { previous: 0, current: 0, amt: 0.1 },
    y: { previous: 0, current: 0, amt: 0.1 },
  }
  reqAnimationId: number = undefined
  inView: boolean = true

  onResize: () => void
  scroll: { x: number; y: number }
  // onLeaveListener : () => void = () => {}

  constructor(el: MagnetType) {
    super()
    // console.log('constructor invoked')

    this.events = EventUtil.getInstance();
    this.element = el.element
    this.stop = el.stop
    this.distance = el.distance
    // this.onLeaveListener = el.onLeave

    this.initEvents()
  }

  calculateSizePosition() {
    // size/position
    this.rect = this.element.getBoundingClientRect()
    this.scroll = { x: window.scrollX, y: window.scrollY }
    this.distanceToStop = this.rect.width * this.stop
  }

  initEvents() {
    this.onResize = () => this.calculateSizePosition()
    window.addEventListener('resize', this.onResize)

    this.element.addEventListener('mouseenter', ev => {
      // console.log('Enter')

      gsap.killTweensOf(this.element);
      this.onStart()
      this.calculateSizePosition()
      this.loopRender()
    })
  }

  loopRender(fn?) {
    if (!this.reqAnimationId) {
      this.reqAnimationId = requestAnimationFrame(() => this.render())
    }
  }

  async initial(){
    gsap.fromTo(
      this.element,
      {
        x: this.renderedStyles.x.previous,
        y: this.renderedStyles.y.previous,
      },
      {
        x: 0,
        y: 0,
        duration: 0.8,
        ease: 'power3',
      }
    )
  }

  stopRendering() {
    if (this.reqAnimationId) {
      window.cancelAnimationFrame(this.reqAnimationId)
      this.reqAnimationId = undefined

      this.onLeave()

      this.initial()

      this.renderedStyles.y.previous = this.renderedStyles.x.previous = 0
      // this.onLeaveListener();
    }
  }

  destroy() {
    window.removeEventListener('resize', this.onResize)
  }

  render() {
    // console.log(distanceMouseButton)
    const distanceMouseButton = distance(
      this.events.mousePos.x,
      this.events.mousePos.y,
      this.rect.left + this.rect.width / 2, //center
      this.rect.top + this.rect.height / 2 //center
    )

    if (distanceMouseButton > this.distanceToStop) {
      return this.stopRendering()
    }

    const scrollDif = {
      x: this.scroll.x - window.scrollX,
      y: this.scroll.y - window.scrollY,
    }

    this.renderedStyles.x.current =
      (this.events.mousePos.x -
        (scrollDif.x + this.rect.left + this.rect.width / 2)) *
      this.distance

    this.renderedStyles.y.current =
      (this.events.mousePos.y -
        (scrollDif.y + this.rect.top + this.rect.height / 2)) *
      this.distance

    for (const key in this.renderedStyles) {
      this.renderedStyles[key].previous = lerp(
        this.renderedStyles[key].previous,
        this.renderedStyles[key].current,
        0.1
      )
    }

    this.element.style.transform = `translate(${this.renderedStyles.x.previous}px, ${this.renderedStyles.y.previous}px)`

    this.reqAnimationId = requestAnimationFrame(() => this.render())
  }

  private onStart(){
    this.emit('start')
  }

  private onLeave(){
    this.emit('leave')
    // console.log('emit LEAVE')
  }
}
