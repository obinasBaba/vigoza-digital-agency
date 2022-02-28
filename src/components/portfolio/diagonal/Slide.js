import React, {useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {motion, useAnimation, useMotionValue} from 'framer-motion'

const SlideContainer = styled( motion.div )`
  position: absolute;
  width: 100%;
  display: flex;
  pointer-events: none;
  cursor: pointer;
  height: 100%;
  grid-area: slide;
  

  .slide__img-wrap {
    position: absolute;
    width: 100%;
    //overflow: hidden;
    height: 80%;
    top: 10%;

    //border: thick solid navajowhite;
  }

  .slide__img {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: cover;
    background-position: 50% 50%;
    position: absolute;
    //pointer-events: none;
    transform: scale3d(1.01, 1.01, 1);
  }

  .slide__img-wrap,
  .slide__title-wrap,
  .slide__side {
    //opacity: 0;
    //pointer-events: auto;
  }

  &.slide--visible .slide__img-wrap {
    //pointer-events: auto;
  }

  &.slide--current .slide__img-wrap {
    //opacity: 1;
    //pointer-events: auto;

    //border: thick solid red;

  }

  h1{
    font-size: 5rem;
    position: absolute;
    display: block;
    z-index: 999;
    top: 40%;
    left: 45%;
  }


  @media screen and  (min-width: 53em) {
    padding: 10vh 0 7vh;
    flex-direction: column;
    justify-content: space-between;
    color: navajowhite;


    .slide__title-wrap {
      margin: 0 0 0 -1.85rem;
      z-index: 110;

      .slide__title,
      .slide__subtitle,
      .slide__side {
        display: block;
      }

      .slide__title {
        font-size: 3.25rem;
        font-family: var(--raisonne-br);
        margin: 0 0 0.25rem;
      }

      .slide__subtitle {
        font-weight: normal;
        margin: 0;
        min-height: 50px;
      }
    }


    .slide__side {
      margin: 0 0 0 -1.85rem;
      position: relative;
      -webkit-writing-mode: vertical-rl;
      writing-mode: vertical-rl;
      transform: rotate(180deg);
      z-index: 1000;
    }
  }


`

// {x: `calc( (100% / 3) - (100vw / 2))`, y: `calc((80% / 3) - (100vh / 2) )`, rotation: 0},
// {x: `calc( ((100vw / 2) - (100% / 3))`, y: `calc( (100vh / 2) - (80% / 3) )`, rotation: 'calc( (0vh) - (0%) )'},

let winsize;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize()

// calc( -1 * ( ${winsize.width / 2} + (100% / 3))

const positions = [
    {x: -1 * (winsize.width / 2 + 359.4), y: -1 * (winsize.height / 2 + 504), rotation: -30},
    {x: -1 * (winsize.width / 2 - 359.4 / 3), y: -1 * (winsize.height / 2 - 504 / 3), rotation: 0},
    {x: 0, y: 0, rotation: 0},
    {x: winsize.width / 2 - 359.4 / 3, y: winsize.height / 2 - 504 / 3, rotation: 0},
    {x: winsize.width / 2 + 359.4, y: winsize.height / 2 + 504, rotation: 30},
];

const positions2 = {
prevOut: {x: -1 * (winsize.width / 2 + 359.4), y: -1 * (winsize.height / 2 + 504), rotation: -30},
prev: {x: -1 * (winsize.width / 2 - 359.4 / 3), y: -1 * (winsize.height / 2 - 504 / 3), rotation: 0},
current: {x: 0, y: 0, rotation: 0},
next: {x: winsize.width / 2 - 359.4 / 3, y: winsize.height / 2 - 504 / 3, rotation: 0},
nextOut: {x: winsize.width / 2 + 359.4, y: winsize.height / 2 + 504, rotation: 30},
}

function moveToPosition(settings = {overwrite: {}}) {

    return {
        x: positions[settings.position].x,
        y: positions[settings.position].y,
        opacity: 1,
        pointerEvents: 'auto',
        rotationX: 0,
        rotationY: 0,
        rotationZ: positions[settings.position].rotation,
        transition: {
            duration: settings.duration !== undefined ? settings.duration : .8,
            delay: settings.delay !== undefined ? settings.delay : 0,
            ease: [0.83, 0, 0.17, 1],
        },
        ...settings.overwrite
    }
}

function hide() {
    return {
        x: 0,
        y: 0,
        pointerEvents: 'none',
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        opacity: 0,
        transition: {
            duration: 0
        }
    }
}

let exitSlide = null;
let upcomingPos = null;
let dir = null;

const variants = {
    getKeyframe(f,l) {
        return {
            x: [null, f.x, l.x],
            y: [null, f.y, l.y],
            opacity: [null, 0, 1],
            rotation: [null, f.rotationZ, l.rotationZ],
            pointerEvents: 'auto',
            transition: {
                duration: .8,
                delay: 0.21,
                times: [0, 0, 1],
                ease: [0.83, 0, 0.17, 1]
            }

        }
    },

    initial: {  },

    animate(arg){
        let f, l;
        if ((arg.isNext || arg.isPrev)){
             f =  moveToPosition({
                position: arg.isNext ? 4 : 0,
                delay: 0,
                duration: 0,
                overwrite: {
                    opacity: 0,
                }
            })

            l = moveToPosition({
                position : arg.isNext ? 3 : 1,
                delay: 0
            })
        }

        if (arg.isNext){ //

            if (arg.idx === upcomingPos){
                return variants.getKeyframe( f, l )
            }

            return l;

        }else if(arg.isPrev){  // the previous prev

            if (arg.idx === upcomingPos){

                return variants.getKeyframe( f, l )

            }

            return l;

        }else if ( arg.isCurrent ){  // the previous next
            return moveToPosition({
                position: 2,
                delay: 0.07
            })
        }else if(arg.idx === exitSlide){
            return moveToPosition({
                position:  dir === 'next' ? 0 : 4,
                delay: 0,
                overwrite: {
                    transitionEnd: {
                        ...hide()
                    }
                }
            })
        }

        return hide()
    },

}

const textVariants = {
    initial: {},

    animate(arg){
        if (arg.isCurrent){
            return {
                opacity: 1,
            }
        }
        return {
            opacity: 0
        }
    },
}


const SlideItem = ({imgSrc, isCurrent, isPrev, isNext, slideInfo, idx, setSlideInfo, onSlideClick, text = {}}) => {
    const imgWrapRef = useRef(null)
    const upComingData = useMotionValue(null)

    function navigate() {
        if (isCurrent) return;

        const current = slideInfo.current;
        const slidesTotal = slideInfo.slidesTotal;

        exitSlide = isNext ? slideInfo.prevSlide() : slideInfo.nextSlide();
        dir = isNext ? 'next' : 'prev'


        upcomingPos = isNext ?
            (current < slidesTotal - 2 ? current + 2 : Math.abs(slidesTotal - 2 - current)) :
            (current >= 2 ? current - 2 : Math.abs(slidesTotal - 2 + current));

         let newCurrent = isNext ?
            (current < slidesTotal - 1 ? current + 1 : 0) :
            (current > 0 ? current - 1 : slidesTotal - 1);

        let newSlideInfo = {
            current: newCurrent,
            dir
        }

        onSlideClick(newSlideInfo)
    }

    return (
        <SlideContainer className={`slide slide-${idx} ${isCurrent ? 'slide--current' : ''} 
                        ${(isPrev || isNext || isCurrent) ? 'slide--visible' : ''}`}
                        variants={{}}

        >

            <motion.div className={`slide__img-wrap slide-img-wrap-${idx}`} ref={imgWrapRef}
                        onTap={_ => navigate( idx )}
                        variants={variants}
                        custom={{
                            isPrev, isNext, isCurrent, idx,
                            isUpcoming: upComingData,
                        }}
            >
                <h1>{idx}</h1>
                <div className="slide__img" style={{backgroundImage: `url(${imgSrc})`,}}/>
            </motion.div>

            <motion.div className="slide__side"
                        variants={textVariants}
                        custom={{
                            isPrev, isNext, isCurrent, idx,
                            isUpcoming: upComingData,
                        }}
            >
                {text.side}
            </motion.div>

            <motion.div className="slide__title-wrap"
                        variants={textVariants}
                        custom={{
                            isPrev, isNext, isCurrent, idx,
                            isUpcoming: upComingData,
                        }}
            >
                <span className="slide__number">{ idx }</span>
                <h3 className="slide__title">{text.title}</h3>
                <h4 className="slide__subtitle">{text.subtitle}</h4>
            </motion.div>

        </SlideContainer>
    );
};

export default SlideItem;
