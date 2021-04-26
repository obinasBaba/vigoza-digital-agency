// noinspection CssUnknownTarget

import React from 'react';
import {Box, Grid, IconButton, Typography} from "@material-ui/core";
import {Facebook, Instagram, Pinterest, Twitter} from "@material-ui/icons";
import { ScrollDown} from './style'
import styled from "styled-components";
import { compose, spacing, palette } from '@material-ui/system';
import {grey} from "@material-ui/core/colors";


const GridContainer = styled(Grid)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  position: relative;
  background-image: url("img/hero.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

`

const HeroTextWrapper = styled( Grid )`
  gap: 1em;
  display: flex;
  flex-flow: column;
  transform: translateY(-70%);
  
  //width: auto;

  ${ ({theme}) => `
      ${ theme.breakpoints.up( 'sm' ) } {
        transform: translateY(-35%);
        /*display: none;*/
      }
  `}
  
  //margin-bottom: 8rem;
  
  
  & > :nth-child(1){
    font-size: clamp(4rem, 8vw, 10rem);
    letter-spacing: clamp(20px, 5vw, 74px);
    //font-weight: bolder;
  }
  
  & > :nth-child(2){
    display: inline-block;
    letter-spacing: calc(.12em + .2vw );
    text-transform: uppercase;
    font-weight: lighter;
    margin-right: auto;
    color: ${props => props.theme.palette.primary.light};
    //padding-bottom: 1rem;
    
    &::after{
      content: '';
      display: block;
      height: 2px;
      margin-top: .5rem;
      width: 73%;
      background-color: ${props => props.theme.palette.secondary.dark};
    }
    
  }
`

const Icon = styled(IconButton)` 
  
  
    &.MuiIconButton-edgeStart{
      
    }
`


function Hero() {

    return (
        <GridContainer container>

            <Grid item xs={1} md={2}/>

            <Grid item container xs={ 10 } md={7} alignItems='center' justify='center'>

                <HeroTextWrapper item>

                    <Typography variant='h1'>Vigoza</Typography>
                    <Typography variant='body1'>Powered By Vigoza Studio</Typography>
                    <Typography variant='body1'>ReadMore</Typography>

                </HeroTextWrapper>

                <ScrollDown>
                    <Typography variant='body1' >
                        Scroll Down
                    </Typography>
                </ScrollDown>

            </Grid>

            <Grid item md={2} />

            <Grid item container xs={ 1 } direction='column'
                  alignItems='center' justify='center' >

                <Icon edge='start' fontSize='large'  >
                    <Facebook style={{ color: grey[300] }}  />
                </Icon>
                <IconButton edge='start'  >
                    <Instagram  style={{ color: grey[300] }}  />
                </IconButton>
                <IconButton edge='start'>
                    <Twitter style={{ color: grey[300] }} fontSize='large'/>
                </IconButton>
                <IconButton edge='start'>
                    <Pinterest style={{ color: grey[300] }} fontSize='large' />
                </IconButton>
            </Grid>

        </GridContainer>
    );
}

export default Hero;
