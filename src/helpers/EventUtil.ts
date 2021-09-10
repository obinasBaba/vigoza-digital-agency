import {getMousePos} from './utils'

 class EventUtil{
  private static Instance: EventUtil = null;
  public mousePos = {
    x: 0,
    y: 0
  }

  static getInstance(){
    if ( this.Instance === null ) {
      this.Instance = new EventUtil();
      return this.Instance;
    }else {
      return this.Instance
    }

  }

  constructor () {
    window.addEventListener('mousemove', ev => this.mousePos = getMousePos(ev)  )
  }

}

export default EventUtil