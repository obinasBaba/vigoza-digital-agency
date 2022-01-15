// noinspection JSUnresolvedVariable

import React, {useContext, useEffect, useRef, useState} from 'react';
import ImgSvg from "./AboutSvg";
import {Grid, Typography} from "@material-ui/core";
import styled, {css} from "styled-components";
import {heightWidth, largeUp, mediumUp} from "../../styles/mixins";
import {AppStateContext} from "../../contexts/AppStateContext";
import {useIntersection} from "react-use";

const AboutContainer = styled(Grid)`
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  --p-color: #000000;
  --s-color: #000000;

  p, h1, h2 {
    transition: color 3s cubic-bezier(0.6, 0.01, 0, 0.9);
    color: var(--p-color);
  }

  ${({inView}) => inView && css`
    --p-color: #000000;
    --s-color: #000000;
  `};
`

const ContentWrapper = styled('div')`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: .4fr .5fr .25fr .25fr .4fr .4fr;
`

const SvgWrapper = styled('div')`
  grid-column: 1 / 12;
  grid-row: 2 / 5;
  align-self: start;
  z-index: -1;
  position: relative;
  overflow: hidden;

  ${({theme}) => `
    
      ${theme.breakpoints.up('sm')} {
        align-self: start;
        grid-column: 2 / 12;
      }
      
      ${theme.breakpoints.up('md')} {
        grid-column: 2 / 10;
      }
      
      ${theme.breakpoints.up('lg')} {
        grid-column: 2 / 8;
        align-self: end;
      }
  `}
  &::after {
    //content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(100%, 100%, 100%, .5);
  }

`

const TypoWrapper = styled('div')`

  grid-column: 7 / 13;
  grid-row: 2 / 4;
  align-self: end;
  justify-self: end;

    /* ${({theme}) => `
      ${theme.breakpoints.up('lg')} {
         justify-self: start;
         grid-column: 6 / 13;
      }
`}*/

  ${largeUp(css`
    justify-self: start;
    grid-column: 6 / 13;
  `)};

  & > :nth-child(n) { //creative studio
    font-family: Poppins, sans-serif;
    letter-spacing: clamp(3px, .9vw, 9px);
    text-transform: capitalize;
  }

  & > :first-child {
    text-indent: 50px;
  }

  & > :last-child { //studio
    color: ${props => props.theme.palette.secondary.main};
  }
`

const AboutText = styled(Typography)`
  grid-column: 1 / 13;
  grid-row: 5 / 6;
  align-self: start;
  justify-self: center;
  padding-top: 2em;
  max-width: 60ch;
  position: relative;
  font-weight: bold;

  &::before {
    content: '';
    position: absolute;
    background-color: ${props => props.theme.palette.secondary.main};
    left: 13%;
    top: 10%;
    width: 3px;
    height: 50px;
    transform: translateY(-100%);
  }

  ${mediumUp(css`
    grid-column: 6 / 13;

  `)};

  ${largeUp(css`
    grid-column: 8 / 13;
    grid-row: 4 / 6;
    align-self: center;
    justify-self: start;

    &::before {
      left: 0;
      top: 30%;
      width: 50px;
      height: 3px;
      transform: translateX(-120%);
    }
  `)};

`

const A = styled.h1`
  position: absolute;
  font-size: 20rem;
  font-family: Poppins, sans-serif;
  font-weight: bolder;
  text-transform: uppercase;
  line-height: 0;
  opacity: .06;
  top: 45%;
  //right: 0%;
  color: rgb(255, 69, 0) !important;
  //transform: translateY(-100%);
`

const AboutEffect = styled('h1')`
  position: absolute;
  font-family: Poppins, sans-serif;
  font-weight: bolder;
  font-size: 10rem;
  right: 0;
  top: 0%;
  z-index: -999;
  line-height: 0;
  opacity: .09;
  ${heightWidth('letter-spacing', .2)}
  color: rgb(255, 69, 0) !important;
  filter: blur(4px);

`;

const About = () => {
    const containerRef = useRef(null);

    const [inView, setInView] = useState(false);
    const {setDotIndex} = useContext(AppStateContext);


    const intersection = useIntersection(containerRef, {
         root: null,
         rootMargin: `0px 0px -400px 0px`,
         threshold: 0,
     })
 
     useEffect(() => {
         if (intersection && intersection.isIntersecting) {
             setInView(true)
             setDotIndex(1)
         } else {
 
         }
 
 
     }, [intersection])

    return (
        <AboutContainer xs item container ref={containerRef}
                        inView={inView}
            // data-scroll-section
            
                        data-scroll-class='about-inview'
                        data-scroll-id='about'
                        data-scroll-call="about"
                        data-scroll
                        data-scroll-repeat={true}

                        id='about'
        >

            <A>A</A>
            <AboutEffect>ABOUT</AboutEffect>

            <Grid item xs={1} md={1}/>

            <Grid item xs md container>
                <ContentWrapper>

                    <SvgWrapper>
                        <ImgSvg/>
                    </SvgWrapper>

                    <TypoWrapper>
                        <Typography variant='h2'>creative</Typography>
                        <Typography variant='h2'>studio</Typography>
                    </TypoWrapper>

                    <AboutText gutterBottom variant='body1'
                               data-scroll-call='about-call'
                               data-scroll>
                        VIGOZA™ is a small, multi-skilled team of designers, developers and writers, working in
                        partnership with brands, publishers and audiences. We focus on developing our own inhouse
                        digital publications as well as selling our creative services to a select group of brand
                        partners.

                        <Typography component='span'
                                    style={{
                                        marginTop: '2rem',
                                        fontWeight: 'lighter',
                                        fontFamily: 'var(--raisonne-b)',
                                        display: "block"
                                    }}>
                            incidunt inventore.
                        </Typography>


                    </AboutText>

                </ContentWrapper>
            </Grid>

            <Grid item xs={1} md={1}/>

        </AboutContainer>
    );
};

export default About;
