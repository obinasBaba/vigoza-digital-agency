import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {useContext, useEffect, useLayoutEffect, useRef} from 'react'
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Cursor from "../components/Fixed/CustomMouse/PointerCursor";
import {ArrowCursor} from "../components/Fixed/CustomMouse";
import {ScrollStateContext} from "../contexts/ScrollStateContext";
import Pagination from "../components/Pagination";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start, elementId = '[data-scroll-container="true"]') {

  const {moScroll} = useContext( ScrollStateContext )
  const locoScroll = useRef(null)

  useLayoutEffect(() => {
    console.log( 'InLocoInvoked ---- --- --', start)

    if (!start) return;


    const scrollEl = document.querySelector(elementId);

    window.locoInstance = locoScroll.current = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      lerp: .08,
      getDirection: true,
    });

    // whenever when we scroll loco update scrollTrigger
    let activeSection = '';
    locoScroll.current.on("scroll", arg => {
      ScrollTrigger.update();
      moScroll.x.set(arg.scroll.x)
      moScroll.y.set(arg.scroll.y)
      moScroll.limit.set(arg.limit.y)
      moScroll.scrollDirection.set(arg.direction)
      // console.log(arg.scroll)
    });

    let prevViewState;
    let prevStateMap = new Map();
    window.locoInstance.on('call', arg => {

      switch (arg) {
        case 'testimonials':

          if (!prevViewState){
            prevViewState = 'enter'
          }else if (prevViewState === 'enter'){

            prevViewState = 'leave'
            ArrowCursor.onSwiperMouseLeave()
            Cursor.showPointer()

          }else if(prevViewState === 'leave') {
            prevViewState = 'enter'
          }

          break
        default:
         /* if (!prevStateMap.get(arg)){
            prevStateMap.set(arg, 'enter')
          }else if (prevStateMap.get(arg) === 'enter'){
            prevStateMap.set(arg, 'leave')
          }else if (prevStateMap.get(arg) === 'leave'){
            prevStateMap.set(arg, 'enter')
            Pagination.ScrollPaginationTo( arg )
          }*/
          break
      }
    })


    ScrollTrigger.scrollerProxy(scrollEl, {
      getBoundingClientRect(){
        return{
          top: 0, left: 0, width: window.innerWidth, height: window.innerHeight
        }
      },

      // pinType: document.querySelector('').style.transform ? 'transform': 'fixed',

      scrollTop(value) {
        if (locoScroll.current) {
          return arguments.length
            ? locoScroll.current.scrollTo(value, 0, 0)
            : locoScroll.current.scroll.instance.scroll.y;
        }
        return null;
      },

      scrollLeft(value) {
        if (locoScroll.current) {
          return arguments.length
            ? locoScroll.current.scrollTo(value, 0, 0)
            : locoScroll.current.scroll.instance.scroll.x;
        }
        return null;
      },
    });

    const lsUpdate = () => {
      if (locoScroll.current) {
        locoScroll.current.update();
      }
    };

    window.addEventListener('resize', lsUpdate)
    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    setTimeout(() => {
      if (locoScroll.current)
        locoScroll.current.update()

    }, 0)

    return () => {
      if (locoScroll.current) {
        window.removeEventListener('resize', lsUpdate)
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoScroll.current.destroy();
        locoScroll.current = null;
        console.log("Kill", locoScroll.current);
      }
    };
  }, [start]);

  return locoScroll.current;
}
