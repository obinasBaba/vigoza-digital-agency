// noinspection CssUnknownTarget

import React, {useContext, useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {AppStateContext} from "../../contexts/AppStateContext";
import {useIntersection} from "react-use";
import {gridColWidth, gridify, heightWidth, spacing} from "../../styles/mixins";
import HeadLine from "../HeadLine";
import ProjectItems from "./ProjectItems";
import Menu from "./Menu";

const PortfolioContainer = styled.div`
  min-height: 100vh;
  //max-width: 100vw;
  background-image: url("img/portfolio_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-content: center;
  justify-content: center;
  
  
  ${spacing('pv', 12)};
  ${gridify()};
  ${spacing('gap', 1)};

`

const ContentWrapper = styled.div`
  align-self: center;
  justify-self: start;
  display: flex;
  flex-flow: wrap;

  ${heightWidth('gap', 7)};
  ${ gridColWidth(21, ) };
`

const HeadLineStyle = css`
  ${ gridColWidth(21, ) };

`

const Portfolio = () => {

    const containerRef = useRef(null);
    const {setDotIndex} = useContext(AppStateContext);
   /* const intersection = useIntersection(containerRef, {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: .6,
    })

    useEffect(() => {
        if (intersection && intersection.isIntersecting) {
            // setInView(true)
            setDotIndex(3)
        }


    }, [intersection])*/

    return (
        <PortfolioContainer ref={containerRef}  data-scroll-section id='portfolio'>
            <HeadLine text='portfolio' styles={HeadLineStyle}/>

            <ContentWrapper>
                <ProjectItems/>
                <Menu/>
            </ContentWrapper>

        </PortfolioContainer>
    );
};

export default Portfolio;
