
import React, {useContext, useEffect, useRef} from 'react';
import {Grid, Typography} from "@material-ui/core";
import {ScrollDown} from './components'
import styled, {css} from "styled-components";
import {largeUp} from "../../styles/mixins";
import MotionBtn from "../MotionBtn";
import Social from "./Social";
import {useIntersection} from "react-use";
import {AppStateContext} from "../../contexts/AppStateContext";


const GridContainer = styled( Grid )`
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url("img/hero.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  color: white;
`

const HeroTextWrapper = styled( Grid )`
  gap: .3em;
  display: flex;
  flex-flow: column;
  transform: translateY(-70%);
  margin-left: 1vw;
  
  ${ largeUp( css`
    transform: translateY(-27%);
  ` ) };
  
  & > :nth-child(1) {
    font-size: clamp(4rem, 9vw, 8rem);
    letter-spacing: clamp(20px, 5vw, 74px);
  }

  .powered {
    display: inline-block;
    //letter-spacing: calc(.12em + .2vw);
    letter-spacing: 3px;
    font-family: var(--abyss);
    text-transform: uppercase;
    font-weight: bolder;
    margin-right: auto;
    color: ${ props => props.theme.palette.primary.light };
    //padding-bottom: 1rem;

    &::after {
      content: '';
      display: block;
      height: 1px;
      margin-top: .5rem;
      width: 123%;
      background-color: orangered;
    }

  }
`

const EffectTypo = styled.h1`
  position: absolute;
  font-family: Poppins, sans-serif;
  font-weight: bolder;
  text-transform: uppercase;
  letter-spacing: clamp(20px, 3vw ,40px);
  line-height: 0;
  bottom:-16%;
  left: -3%;
  transform: translateX(-63%);
  font-size: 15rem;
  z-index: -1;
  opacity: .08;
`

function Hero() {
    const containerRef = useRef(null);
    const {setDotIndex} = useContext(AppStateContext);


    /*const intersection = useIntersection(containerRef, {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: .6,
    })

    useEffect(() => {
        return;


        if(intersection && intersection.isIntersecting) {
            setDotIndex(0)
        }

    }, [intersection])*/


    return (
        <GridContainer container ref={containerRef}  data-scroll-section id='welcome' >

            <Grid item xs={ 1 } md={ 2 }/>

            <Grid item container xs={ 10 } md={ 7 }
                  alignItems='center' justify='center'>

                <HeroTextWrapper item>

                    <Typography variant='h1'>Vigoza</Typography>
                    <Typography className='powered' variant='subtitle2'>
                        Powered By Vigoza Studio
                    </Typography>
                    <MotionBtn txt={'Read More'} />

                </HeroTextWrapper>

                <ScrollDown>
                    <Typography variant='body2'>
                        Scroll Down
                    </Typography>
                </ScrollDown>

            </Grid>

            <Grid item md={ 2 }/>

            <Social/>

            <EffectTypo>
                Vigoza
            </EffectTypo>

        </GridContainer>
    );
}

export default Hero;
