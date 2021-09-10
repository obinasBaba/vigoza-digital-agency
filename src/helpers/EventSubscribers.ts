// import {EventEmitter} from 'events'
const {EventEmitter}  = require('events')


export default class EventSubscribers extends EventEmitter{

  private static _instance : EventSubscribers = null;
  private subscribers = []

  static getInstance() : EventSubscribers {
    if ( this._instance === null ){
      this._instance = new EventSubscribers()
      return this._instance
    }
    else{
      return this._instance
    }
  }

  constructor () {
    super()
  }

  addLoader(){
    this.subscribers.push('loader : ')
    console.log(this.subscribers)

  }

  finishLoading(){
    this.subscribers.pop()

    if ( this.subscribers.length === 0 )
      this.emit('finishLoading')
  }

}
