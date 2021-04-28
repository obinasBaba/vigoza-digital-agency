// noinspection CssUnknownTarget

import React from 'react';
import {Grid, IconButton, Typography} from "@material-ui/core";
import {Facebook, Instagram, Pinterest, Twitter} from "@material-ui/icons";
import {ScrollDown} from './style'
import styled from "styled-components";
import {grey} from "@material-ui/core/colors";


const GridContainer = styled( Grid )`
  height: 100vh;
  overflow: hidden;
  position: relative;
  background-image: url("img/hero.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  z-index: 0;

`

const HeroTextWrapper = styled( Grid )`
  gap: 1em;
  display: flex;
  flex-flow: column;
  transform: translateY(-70%);
  margin-left: 1vw;

  ${ ({theme}) => `
      ${ theme.breakpoints.up( 'lg' ) } {
        transform: translateY(-35%);
        /*display: none;*/
      }
  ` } 
  & > :nth-child(1) {
    font-size: clamp(4rem, 9vw, 8rem);
    letter-spacing: clamp(20px, 5vw, 74px);
  }

  & > :nth-child(2) {
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
                    <Typography variant='body1'>Powered By Vigoza Studio</Typography>
                    <Typography >ReadMore</Typography>

                </HeroTextWrapper>

                <ScrollDown>
                    <Typography variant='body1'>
                        Scroll Down
                    </Typography>
                </ScrollDown>

            </Grid>

            <Grid item md={ 2 }/>

            <Grid item container xs={ 1 } direction='column'
                  alignItems='center' justify='center'>

                <IconButton edge='start'>
                    <Facebook style={ {color: grey[300]} } fontSize='large'/>
                </IconButton>
                <IconButton edge='start'>
                    <Instagram style={ {color: grey[300]} } fontSize='large'/>
                </IconButton>
                <IconButton edge='start'>
                    <Twitter style={ {color: grey[300]} } fontSize='large'/>
                </IconButton>
                <IconButton edge='start'>
                    <Pinterest style={ {color: grey[300]} } fontSize='large'/>
                </IconButton>
            </Grid>

            <EffectTypo>
                Vigoza
            </EffectTypo>

        </GridContainer>
    );
}

export default Hero;
