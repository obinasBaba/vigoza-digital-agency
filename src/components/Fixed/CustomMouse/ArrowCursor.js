import React from "react";
import gsap from "gsap";
import styled from "styled-components";
import {motion, MotionValue} from "framer-motion";

const mouse = {
    x: new MotionValue(0),
    y: new MotionValue(0),
}

let cursorSide = null; // will be "left" or "right"
let cursorInsideSwiper = false;

const ArrowCursorContainer = styled(motion.div)`
  position: absolute;
  left: -75px;
  top: -55px;

  z-index: 20;
  width: 150px;
  height: 110px;
  pointer-events: none;
  
  & * {
    pointer-events: none;
  }
  //border: thin solid red;

  svg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    pointer-events: none;

  }
`


class ArrowCursor extends React.Component {

    trackMousePos = (ev) => {
        mouse.x.set(ev.clientX)
        mouse.y.set(ev.clientY)
    }


    componentDidMount() {
        window.addEventListener('mousemove', this.trackMousePos)

        gsap.set('.arrow-cursor__icon', {
            rotation: -135,
            opacity: 0,
            scale: .5,
        })
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.trackMousePos)
    }

    // mouseenter
    static onSwiperMouseEnter(e) {
        const swiperBox = e.target.getBoundingClientRect();

        // mouse.x = e.clientX;
        // mouse.y = e.clientY;

        let startRotation;
        if (mouse.y.get() < swiperBox.top + swiperBox.height / 2) {
            startRotation = -135;
        } else {
            startRotation = mouse.x.get() > window.innerWidth / 2 ? 135 : -315;
        }

        gsap.set('.arrow-cursor__icon', {
            rotation: startRotation
        });

        cursorSide = mouse.x.get() > window.innerWidth / 2 ? "right" : "left";

        gsap.to('.arrow-cursor__icon', {
            rotation: cursorSide === "right" ? 0 : -180,
            scale: 1,
            opacity: 1,
            ease: 'back.out(1.7)',
            duration: .3
        });
    };

    // mouseLeave
    static onSwiperMouseLeave(e) {
        const swiperBox = e.target.getBoundingClientRect();

        let outRotation;
        if (mouse.y.get() < swiperBox.top + swiperBox.height / 2) {
            outRotation = cursorSide === "right" ? -135 : -45;
        } else {
            outRotation = cursorSide === "right" ? 135 : -315;
        }

        gsap.to('.arrow-cursor__icon', {
            rotation: outRotation,
            opacity: 0,
            scale: 0.3,
            duration: .3,
        });

        cursorSide = null;
        cursorInsideSwiper = false;
    };

    static bump() {
        gsap.timeline()
            .to('.arrow-cursor__icon', {
                scale: .85,
                duration: .1,

            }).to('.arrow-cursor__icon', {
                scale: 1,
                duration: .2,
                ease: 'back.out(1.7)'
            })

    }

    static onSwitchSwiperSides() {

        if (cursorInsideSwiper) {
            gsap.to('.arrow-cursor__icon', {
                rotation: cursorSide === 'right' ? -180 : 0,
                ease: 'back.out(1.7)',
                duration: .3,
            })

            cursorSide = cursorSide === 'left' ? 'right' : 'left'
        }

        if (!cursorInsideSwiper)
            cursorInsideSwiper = true

    }

    static onTouchMove(e) {

        mouse.x.set(e.touches.currentX);
        mouse.y.set(e.touches.currentY);

        cursorSide = mouse.x.get() > window.innerWidth / 2 ? 'right' : 'left';

        gsap.to('.arrow-cursor__icon', {
            rotation: cursorSide === 'right' ? 0 : -180,
            ease: 'back.out(1.7)',
            duration: .3,
        })

    }


    render() {

        return (

                <ArrowCursorContainer className="arrow-cursor" style={{x: mouse.x, y: mouse.y,}}>

                        <svg className="arrow-cursor__icon" viewBox="0 0 117.25 86.75">
                            <path className="arrow-cursor__path"
                                  d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z"
                                  fill='none' strokeWidth='3.5' stroke='rgba(255, 69, 0, 0.92)'
                                  strokeLinecap='round' strokeLinejoin='round'

                            />
                        </svg>


                </ArrowCursorContainer>

        );

    }

}

export default ArrowCursor