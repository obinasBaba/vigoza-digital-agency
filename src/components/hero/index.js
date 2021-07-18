
import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import {ScrollDown} from './components'
import styled, {css} from "styled-components";
import {largeUp} from "../../styles/mixins";
import MotionBtn from "../MotionBtn";
import Social from "./Social";


const GridContainer = styled( Grid )`
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url("img/hero.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;
  color: white;
`

const HeroTextWrapper = styled( Grid )`
  gap: 1em;
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
    letter-spacing: calc(.12em + .2vw);
    text-transform: uppercase;
    font-weight: lighter;
    margin-right: auto;
    color: ${ props => props.theme.palette.primary.light };
    //padding-bottom: 1rem;

    &::after {
      content: '';
      display: block;
      height: 2px;
      margin-top: .5rem;
      width: 73%;
      background-color: ${ props => props.theme.palette.secondary.main };
    }

  }
`

const EffectTypo = styled.h1`
  position: absolute;
  font-family: Poppins, sans-serif;
  font-weight: bolder;
  text-transform: uppercase;
  letter-spacing: clamp(20px, 4vw ,60px);
  line-height: 0;
  bottom:-6%;
  left: 0;
  transform: translateX(-63%);
  font-size: 15rem;
  z-index: -1;
  opacity: .08;
`

function Hero() {

    return (
        <GridContainer container>

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
