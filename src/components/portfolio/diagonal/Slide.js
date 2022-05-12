import React, { useContext, useEffect, useLayoutEffect, useRef } from 'react';
import styled, { css } from "styled-components";
import { motion, useMotionValue } from 'framer-motion'
import { Link } from "react-router-dom";
import { AppStateContext } from "../../../contexts/AppStateContext";
import { debounce } from "@material-ui/core";
import { useUI } from "../../../contexts/UIStateContext";


const SlideContainer = styled( motion.div )`
  position: absolute;
  width: 100%;
  display: flex;
  pointer-events: none;
  cursor: pointer;
  height: 100%;
  grid-area: slide; //is gridItem

  //border: thick solid red;

  div.link {
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
  }


  .slide__img-wrap {
    position: absolute;
    width: 100%;
    //overflow: hidden;
    height: 80%;
    top: 10%;


  }

  .slide__img {
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background-size: cover;
    background-position: 50% 50%;
    position: absolute;
    border-radius: 10px;
    //pointer-events: none;
    //transform: scale3d(1.01, 1.01, 1);
  }

  h1 {
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

    .slide__img-wrap {
      opacity: 0;
    }

    &.slide--visible {
      .slide__img-wrap {
        opacity: 1;
      }
    }


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


// calc( -1 * ( ${winsize.width / 2} + (100% / 3))


let winsize;
let vFactor = 2;
const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
calcWinsize()
console.log( 'winsize: ', winsize )

const positions = [
    ( size ) => ({ x: -1 * (winsize.width / 2 + size.width), y: -1 * (winsize.height / 2 + size.height), rotation: -30 }),
    ( size ) => ({ x: -1 * (winsize.width / 2 - size.width / 3), y: -1 * (winsize.height / 2 - size.height / 3), rotation: 0 }),
    () => ({ x: 0, y: 0, rotation: 0 }),
    ( size ) => ({ x: winsize.width / 2 - size.width / 3, y: winsize.height / 2 - size.height / 3, rotation: 0 }),
    ( size ) => ({ x: winsize.width / 2 + size.width, y: winsize.height / 2 + size.height, rotation: 30 }),
    ( size ) => ({ x: -1 * (winsize.width / 2 - size.width / 2), y: 0, rotation: 0 }),
];


function moveToPosition( settings = { overwrite: {} }, size = { width: 0, height: 0 } ){
    const { y, x, rotation } = positions[settings.position]( size )
    return {
        x: x,
        y: y,
        opacity: 1,
        pointerEvents: 'auto',
        scale: 1,
        // rotationX: 0,
        // rotationY: 0,
        rotation: rotation,
        transition: {
            duration: settings.duration !== undefined ? settings.duration : .8,
            delay: settings.delay !== undefined ? settings.delay : 0,
            ease: [0.83, 0, 0.17, 1],
        },
        ...settings.overwrite
    }
}

function hide(){
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
const sizeBackup = { height: 0, width: 0 };


const variants = {
    getKeyframe( f, l ){
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

    initial( arg ){
        if ( !arg.isCurrent )
            return {
                opacity: 0,
            }
    },

    initial2( arg ){

        if ( !arg.isCurrent )
            return { opacity: 0 }

        return {
            originX: 0,
            originY: .5,
            scale: (((winsize.width / sizeBackup.width) * .45) / (winsize.height / (sizeBackup.height * 1.2))),
            x: -1 * (winsize.width / 2 - sizeBackup.width / 2),
        }
    },

    animate( arg ){

        const size = arg.size.get();

        let f, l;
        if ( (arg.isNext || arg.isPrev) ) {
            f = moveToPosition( {
                position: arg.isNext ? 4 : 0,
                delay: 0,
                duration: 0,
                overwrite: {
                    opacity: 0,
                }
            }, size )

            l = moveToPosition( {
                position: arg.isNext ? 3 : 1,
                delay: 0
            }, size )
        }

        if ( arg.isNext ) { //

            if ( arg.idx === upcomingPos || upcomingPos === null ) {
                return variants.getKeyframe( f, l )
            }

            return l;

        } else if ( arg.isPrev ) {  // the previous prev

            if ( arg.idx === upcomingPos || upcomingPos === null ) {

                return variants.getKeyframe( f, l )

            }

            return l;

        } else if ( arg.isCurrent ) {  // the previous next
            return moveToPosition( {
                position: 2,
                delay: 0.07,
            }, size )
        } else if ( arg.idx === exitSlide ) {
            return moveToPosition( {
                position: dir === 'next' ? 0 : 4,
                delay: 0,
                // duration: 0,
                overwrite: {
                    transitionEnd: {
                        ...hide()
                    }
                }
            }, size )
        }

        return hide()
    },

    exit( arg ){

        if ( arg.isPrev ) {
            const size = arg.size?.get();

            return moveToPosition( {
                position: 0,
                delay: 0
            }, size )
        } else if ( arg.isNext ) {
            const size = arg.size?.get();

            return moveToPosition( {
                position: 4,
                delay: 0
            }, size )
        } else if ( arg.isCurrent ) {
            return;

          /*  const { width, height } = arg.size?.get();

            Window.nodeSize = arg.size?.get();

            return {
                originX: 0,
                originY: .5,
                scale: (((winsize.width / width) * .45) / (winsize.height / (height * 1.2))),
                x: -1 * (winsize.width / 2 - width / 2),
                transition: {
                    duration: .8,
                    ease: [0.83, 0, 0.17, 1],
                    delay: .01,
                }
            }*/
        }

    }

}

const textVariants = {
    initial: {
        opacity: 0,
    },

    initial2: {
        opacity: 0,
    },

    animate( arg ){
        if ( arg.isCurrent ) {
            return {
                opacity: 1,
                transition: {
                    ...transition,
                    duration: .4,
                    delay: .75,
                }
            }
        }
        return {
            opacity: 0
        }
    },

    exit(){
        return {
            opacity: 0,
            transition: {
                duration: .2,
            }
        }
    }
}

const transition = {
    duration: .8,
    ease: [0.83, 0, 0.17, 1],
}


const SlideItem = ( { imgSrc, isCurrent, isPrev, isNext, slideInfo, idx, setSlideInfo, onSlideClick, text = {} } ) => {

    const { transDetail } = useContext( AppStateContext );
    const imgWrapRef = useRef( null )
    const upComingData = useMotionValue( null )
    const size = useMotionValue( { width: 0, height: 0 } )

    const {  toggleIt } = useUI();

    useLayoutEffect( () => {
        function onResize(){
            const slideWrapper = document.body.querySelector( `.slide .slide-img-wrap-${idx}` );
            size.set( { width: slideWrapper.offsetWidth, height: slideWrapper.offsetHeight } );
            ([sizeBackup.width, sizeBackup.height] = [slideWrapper.offsetWidth, slideWrapper.offsetHeight]);

        }

        onResize();

        const onResizeDebounced = debounce( onResize, 1 )

        window.addEventListener( 'resize', onResizeDebounced )
        return () => window.removeEventListener( 'resize', onResizeDebounced )

    }, [] )

    function moveTo(){
        if ( isCurrent ) {
            return;
        }

        const current = slideInfo.current;
        const slidesTotal = slideInfo.slidesTotal;

        exitSlide = isNext ? slideInfo.prevSlide() : slideInfo.nextSlide();
        dir = isNext ? 'next' : 'prev'


        upcomingPos = isNext ?
            (current < slidesTotal - 2 ? current + 2 : Math.abs( slidesTotal - 2 - current )) :
            (current >= 2 ? current - 2 : Math.abs( slidesTotal - 2 + current ));

        let newCurrent = isNext ?
            (current < slidesTotal - 1 ? current + 1 : 0) :
            (current > 0 ? current - 1 : slidesTotal - 1);

        let newSlideInfo = {
            current: newCurrent,
            dir
        }

        onSlideClick( newSlideInfo )
    }

    function navigate( evt ){
        evt.preventDefault();

        window.locoInstance.scrollTo( '#slideshow', {
            callback: function(){

            }
        } )

        toggleIt()

        exitSlide = null;
        upcomingPos = null;
        transDetail.set( {
            ...transDetail.get(),
            activeIdx: idx,
            fromCaseStudy: false,
        } )

    }

    return (
        <SlideContainer className={`slide slide-${idx} ${isCurrent ? 'slide--current' : ''} 
                        ${(isPrev || isNext || isCurrent) ? 'slide--visible' : ''}`}
                        variants={{}}
                        prev={isPrev}
                        next={isNext}

        >
            {isCurrent && <div className='link' onClick={navigate}/>}

            <motion.div className={`slide__img-wrap slide-img-wrap-${idx}`} ref={imgWrapRef}
                        onTap={_ => moveTo( idx )}
                        variants={variants}
                        transition={transition}
                        custom={{
                            isPrev, isNext, isCurrent, idx,
                            isUpcoming: upComingData, size,
                        }}
            >

                <div className="slide__img" style={{ backgroundImage: `url(${imgSrc})`, }}/>
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
                <span className="slide__number">{idx}</span>
                <h3 className="slide__title">{text.title}</h3>
                <h4 className="slide__subtitle">{text.subtitle}</h4>
            </motion.div>

        </SlideContainer>
    );
};

export default SlideItem;
