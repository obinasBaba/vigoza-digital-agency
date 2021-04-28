// noinspection JSUnresolvedVariable

import React from 'react';
import ImgSvg from "./AboutSvg";
import {Grid, Typography} from "@material-ui/core";
import styled from "styled-components";

const AboutContainer = styled( Grid )`
  min-height: 100vh;
`

const ContentWrapper = styled( 'div' )`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: .4fr .5fr .25fr .25fr .4fr .5fr;
`

const SvgWrapper = styled( 'div' )`
  grid-column: 1 / 12;
  grid-row: 2 / 5;
  align-self: start;
  z-index: -1;
  position: relative;
  overflow: hidden;
  
  ${ ({theme}) => `
    
      ${ theme.breakpoints.up( 'sm' ) } {
        align-self: start;
        grid-column: 2 / 12;
      }
      
      ${ theme.breakpoints.up( 'md' ) } {
        grid-column: 2 / 10;
      }
      
      ${ theme.breakpoints.up( 'lg' ) } {
        grid-column: 2 / 8;
        align-self: end;
      }
  ` }
 
  &::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba( 100%, 100%, 100%, .5);
  }
   
`

const TypoWrapper = styled( 'div' )`
  
  grid-column: 7 / 13;
  grid-row: 2 / 4;
  align-self: end;
  justify-self: end;
  
  ${ ({theme}) => `
      ${ theme.breakpoints.up( 'lg' ) } {
         justify-self: start;
         grid-column: 6 / 13;
      }
` }
  
  & > :nth-child(n){  //creative studio
    font-family: Poppins, sans-serif;
    letter-spacing: clamp(5px, 1.2vw, 15px);
    text-transform: capitalize;
  }
  
  & > :first-child{
    text-indent: 50px;
  }
  
  & > :last-child{  //studio
    color: ${ props => props.theme.palette.secondary.main };
  }
`

const AboutText = styled( Typography )`

  grid-column: 1 / 13;
  grid-row: 5 / 6;
  align-self: start  ;
  justify-self: center;
  padding-top: 2em;
  max-width: 60ch;
  position: relative;
  
  ${ ({theme}) => `

      ${ theme.breakpoints.up( 'md' ) } {
        grid-column: 6 / 13;
      }
      
      ${ theme.breakpoints.up( 'lg' ) } {
        grid-column: 8 / 13;
        grid-row: 4 / 6;
        align-self: center;
        justify-self: start; 
      }
` }
`


const About = () => {

    return (
        <AboutContainer xs item container>

            <Grid item xs={ 1 } md={1}/>

            <Grid item xs  md container>
                <ContentWrapper>

                    <SvgWrapper>
                        <ImgSvg/>
                    </SvgWrapper>

                    <TypoWrapper>
                        <Typography variant='h2' >creative</Typography>
                        <Typography variant='h2'>studio</Typography>
                    </TypoWrapper>

                    <AboutText  gutterBottom variant='body1'>
                        Lorem ipsum dolor sit amet, consectetur
                        adipisicing elit. Ad assumenda commodi delectus
                        excepturi incidunt inventore neque quae quos
                        similique temporibus. Assumenda esse excepturi
                        labore quaerat, quia unde velit veniam voluptates?

                        <Typography component='span' style={{marginTop: '2rem', display: "block", textAlign: 'left'}}>
                            incidunt inventore
                        </Typography>


                    </AboutText>

                </ContentWrapper>
            </Grid>

            <Grid item xs={ 1 }  md={1}  />

        </AboutContainer>
    );
};

export default About;
