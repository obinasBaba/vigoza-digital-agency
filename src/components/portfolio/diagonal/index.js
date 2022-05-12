import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled, { css } from "styled-components";
import SlideItem from "./Slide";
import { motion, MotionValue, useAnimation, useMotionValue } from "framer-motion";
import useDiagonalShowData from "./useDiagonalShowData";
import { AppStateContext } from "../../../contexts/AppStateContext";
import { debounce } from "@material-ui/core";
import { largeUp, mediumDown, mediumUp, smallUp, xLargeUp } from "../../../styles/mixins";
import { useUI } from "../../../contexts/UIStateContext";

const DiagonalShowContainer = styled( motion.div )`
  position: relative;
  overflow: hidden;
  margin: 0;
  width: 100%;
  height: calc(100vh);

  display: grid;
  //grid-template-columns: 20% 58% 20%;
  grid-template-columns: 33% 33% 33%;

  grid-column-gap: 0.5%;
  grid-template-rows: 100%;
  grid-template-areas: ' . slide . ';

  ${smallUp( css`
    //display: none;
    grid-template-columns: 33% 33% 33%;

  ` )};

  ${xLargeUp( css`

    height: 100vh;
    grid-template-columns: 27% 27% 27%;
    grid-column-gap: 9.5%;

  ` )};


  @media screen and (min-width: 53em) {

  }

  img {
    position: absolute;
    object-fit: cover;
    width: 100%;
    height: 100%;
  }

  .slideshow--previewopen .slide {
    cursor: default;
  }

  .slide--current {
    pointer-events: auto;
  }

  .slideshow__deco {
    grid-area: slide;
    background: var(--accent400);
    width: 100%;
    height: 80%;
    align-self: center;
    position: relative;
    border-radius: 10px;
    //margin: -40px 0 0 0;
    //right: -20px;

  }

  .nav {
    position: absolute;
    background: none;
    width: 3rem;
    height: 3rem;
    z-index: 1000;
    border: 0;
    padding: 0;
    margin: 0;
    pointer-events: none;
    transition: transform 0.8s, opacity 0.8s;
    transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1);

    .icon {
      display: block;
      width: 1.5em;
      height: 1.5em;
      margin: 0 auto;
      fill: var(--accent500);
    }
    
     
  }

  .nav--next {
    bottom: 1rem;
    right: 1rem;
    
    svg{
      transform: rotate(45deg) scale(1.3);
    }
  }

  .nav--prev {
    top: 1rem;
    left: 1rem;

    svg{
      transform: rotate(-145deg) scale(1.3);
    }
  }

  .icon--navarrow-next {
    transform: rotate(45deg);
  }

  

  .icon--navarrow-prev {
    transform: rotate(-135deg);
  }


  .hidden {
    position: absolute;
    overflow: hidden;
    width: 0;
    height: 0;
    pointer-events: none;
  }




`

let winsize;
const calcWinsize = () => winsize = { width: window.innerWidth, height: window.innerHeight };
calcWinsize()

const size = {
    width: 0,
    height: 0
};

const slideContainerVariants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: .05
        }
    }
}

const decoVariants = {
    initial: {},
    initial2( arg ){
        return {
            scaleX: winsize.width / size.width,
            // scaleY: `calc((100vh / 80%)*1)`,
            scaleY: winsize.height / size.height,
            x: 0,
            y: 0,
            // left: 0,
            // right: 0,
            // x:  'calc((-100vw / 2) - 50%)',
            // x: 0,
            // y: 0,
        }
    },

    animate( arg ){
        console.log('arg::: -- - --- - - -- - - -', arg)
        let xy =  arg.dir === 'next' ? -40 : arg.dir === 'prev' ? 40 : 0;
        return {
            x: [null, xy, 20],
            y: [null, xy, -20],
            transition: {
                duration: 1,
                times: [0, .4, 1],
            }
        }
    },

    exit(){
        return;
        return {
            scaleX: winsize.width / size.width,
            scaleY: winsize.height / size.height,
            x: 0,
            y: 0,
            transition: {
                duration: .8,
                ease: [0.83, 0, 0.17, 1],
            }
        }
    }

}

const transition = {
    duration: .8,
    delay: 0,
    ease: [0.83, 0, 0.17, 1],
};


let isAnimating = false;

const Diagonal = () => {

    calcWinsize()
    const { transDetail, nodeLength } = useContext( AppStateContext );
    const { state: { displayCaseStudyEvent } } = useUI();


    const data = useDiagonalShowData()

    const controllers = data.map( ( { controller } ) => controller )
    const pController = useAnimation();

    const [slideInfo, setSlideInfo] = useState( {
        slidesTotal: data.length,
        dir: '',
        current: transDetail.get().activeIdx,
        upcomingPos: null,
        nextSlide(){
            return (this.current + 1 <= data.length - 1 ? this.current + 1 : 0);
        },
        prevSlide(){
            return this.current - 1 >= 0 ? this.current - 1 : data.length - 1;
        },

    } )

    useLayoutEffect( () => {

        const onResize = () => {
            const deco = document.body.querySelector( `.slideshow .slideshow__deco` );
            ([size.width, size.height] = [deco.offsetWidth, deco.offsetHeight]);
            pController.start( 'animate' )

        }
        if ( size.width === 0 )
            onResize()

        const onResizeDebounced = debounce( onResize, 1 )

        window.addEventListener( 'resize', onResizeDebounced )
        return () => window.removeEventListener( 'resize', onResizeDebounced )

    }, [] )

    useEffect(() => {
        displayCaseStudyEvent.onChange(v => {
            if ( v )
                pController.start('exit')
            else
                pController.start('animate')
        })
    }, [])

    useEffect( () => {
        isAnimating = false;
        pController.start( 'animate' )
    }, [slideInfo] )

    useEffect( () => {
        pController.start( 'animate' )
    }, [slideInfo] )

    function sClicked( { current, dir }, exit ){

        window.locoInstance.scrollTo( '#slideshow', )
        if ( isAnimating ) return;
        isAnimating = true;

        setSlideInfo( {
            ...slideInfo,
            current,
            dir
        } )

    }

    return (
        <DiagonalShowContainer className='slideshow'
                               id='slideshow'
                               variants={slideContainerVariants}
                               initial={transDetail.get().fromCaseStudy ? 'initial' : 'initial'}
                               animate={pController}
                               exit='exit'
        >
            <motion.img src={'img/portfolio_bg.jpg'}/>

            <motion.div className="slideshow__deco"
                        variants={decoVariants}
                        custom={{ dir: slideInfo.dir, transDetail: displayCaseStudyEvent }}
                        transition={transition}
            />

            {
                data.map( ( { img, text }, idx ) => {
                    const { prevSlide, nextSlide, current } = slideInfo;
                    return (
                        <SlideItem imgSrc={img}
                                   key={img}
                                   idx={idx}
                                   controller={controllers[idx]}
                                   text={text}
                                   isCurrent={slideInfo.current === idx}
                                   isPrev={slideInfo.prevSlide() === idx}
                                   isNext={slideInfo.nextSlide() === idx}
                                   slideInfo={slideInfo}
                                   onSlideClick={sClicked}


                        />
                    );
                } )
            }

            <svg className="hidden">
                <symbol id="icon-arrow" viewBox="0 0 24 24">
                    <title>arrow</title>
                    <polygon points="6.3,12.8 20.9,12.8 20.9,11.2 6.3,11.2 10.2,7.2 9,6 3.1,12 9,18 10.2,16.8 "/>
                </symbol>
                <symbol id="icon-longarrow" viewBox="0 0 54 24">
                    <title>longarrow</title>
                    <path
                        d="M.42 11.158L12.38.256c.333-.27.696-.322 1.09-.155.395.166.593.467.593.903v6.977h38.87c.29 0 .53.093.716.28.187.187.28.426.28.716v5.98c0 .29-.093.53-.28.716a.971.971 0 0 1-.716.28h-38.87v6.977c0 .416-.199.717-.592.903-.395.167-.759.104-1.09-.186L.42 12.62a1.018 1.018 0 0 1 0-1.462z"/>
                </symbol>
                <symbol id="icon-navarrow" viewBox="0 0 408 408">
                    <title>navarrow</title>
                    <polygon fill="#fff" fillRule="nonzero"
                             points="204 0 168.3 35.7 311.1 178.5 0 178.5 0 229.5 311.1 229.5 168.3 372.3 204 408 408 204"/>
                </symbol>
            </svg>
            <button className="nav nav--prev">
                <svg className="" viewBox="0 0 117.25 86.75">
                    <path className=""
                          d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z"
                          fill='none' strokeWidth='4.5' stroke='rgba(255, 69, 0, 0.92)'
                          strokeLinecap='round' strokeLinejoin='round'

                    />
                </svg>
            </button>
            <button className="nav nav--next">
                <svg className="" viewBox="0 0 117.25 86.75">
                    <path className=""
                          d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z"
                          fill='none' strokeWidth='4.5' stroke='rgba(255, 69, 0, 0.92)'
                          strokeLinecap='round' strokeLinejoin='round'

                    />
                </svg>
            </button>

        </DiagonalShowContainer>
    );
};

export default Diagonal;
