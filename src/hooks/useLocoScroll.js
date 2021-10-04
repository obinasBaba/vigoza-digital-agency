import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import {useContext, useEffect, useLayoutEffect, useRef} from 'react'
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import {AppStateContext} from '../contexts/AppStateContext'

gsap.registerPlugin(ScrollTrigger);

export default function useLocoScroll(start, elementId = '[data-scroll-container="true"]') {

  const {moScroll} = useContext(AppStateContext)
  const locoScroll = useRef(null)

  useLayoutEffect(() => {
    console.log( 'InLocoInvoked ---- --- --', start)

    if (!start) return;


    const scrollEl = document.querySelector(elementId);

    locoScroll.current = new LocomotiveScroll({
      el: scrollEl,
      smooth: true,
      multiplier: 1,
      lerp: .08,
      getDirection: true,
    });

    // whenever when we scroll loco update scrollTrigger
    locoScroll.current.on("scroll", arg => {
      ScrollTrigger.update();
      moScroll.x.set(arg.scroll.x)
      moScroll.y.set(arg.scroll.y)
      moScroll.limit.set(arg.limit.y)
      moScroll.scrollDirection.set(arg.direction)
      // console.log(arg.scroll)
    });


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
