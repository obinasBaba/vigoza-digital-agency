import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useContext, useLayoutEffect, useRef } from 'react'
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import Cursor from "../components/Fixed/CustomMouse/PointerCursor";
import { ArrowCursor } from "../components/Fixed/CustomMouse";
import { ScrollStateContext } from "../contexts/ScrollStateContext";

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start, elementId = '[data-scroll-container="true"]') {

  const {moScroll, locoInstance} = useContext( ScrollStateContext )

  useLayoutEffect(() => {
    // console.log( 'InLocoInvoked ---- --- --', start)

    if (!start) return;


    const scrollEl = document.querySelector(elementId);

    window.locoInstance = locoInstance.current = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      lerp: .08,
      getDirection: true,
    });

    // whenever when we scroll loco update scrollTrigger
    let activeSection = '';
    locoInstance.current.on("scroll", arg => {
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
        if (locoInstance.current) {
          return arguments.length
            ? locoInstance.current.scrollTo(value, 0, 0)
            : locoInstance.current.scroll.instance.scroll.y;
        }
        return null;
      },

      scrollLeft(value) {
        if (locoInstance.current) {
          return arguments.length
            ? locoInstance.current.scrollTo(value, 0, 0)
            : locoInstance.current.scroll.instance.scroll.x;
        }
        return null;
      },
    });

    const lsUpdate = () => {
      if (locoInstance.current) {
        locoInstance.current.update();
      }
    };

    window.addEventListener('resize', lsUpdate)
    ScrollTrigger.addEventListener("refresh", lsUpdate);
    ScrollTrigger.refresh();

    setTimeout(() => {
      if (locoInstance.current)
        locoInstance.current.update()

    }, 0)

    return () => {
      if (locoInstance.current) {
        window.removeEventListener('resize', lsUpdate)
        ScrollTrigger.removeEventListener("refresh", lsUpdate);
        locoInstance.current.destroy();
        locoInstance.current = null;
        console.log("Kill", locoInstance.current);
      }
    };
  }, [start]);

  return locoInstance.current;
}
