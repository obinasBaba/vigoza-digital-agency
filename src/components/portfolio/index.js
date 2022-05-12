// noinspection CssUnknownTarget

import React, { useContext, useEffect, useRef } from 'react';
import styled, { css } from "styled-components";
import { AppStateContext } from "../../contexts/AppStateContext";
import { useIntersection } from "react-use";
import { gridColWidth, heightWidth, spacing } from "../../styles/mixins";
import Diagonal from "./diagonal";
import { motion} from "framer-motion";

const PortfolioContainer = styled.div`
  min-height: 100vh;
  //max-width: 100vw;
  //background-image: url("img/portfolio_bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
 

`

const ContentWrapper = styled.div`
  align-self: center;
  justify-self: start;
  display: flex;
  flex-flow: wrap;
  color: white;
  
  border: thin solid teal;

  ${heightWidth('gap', 7)};
  
  ${ gridColWidth(19, ) };
  ${spacing('mt', 10)}
`

const HeadLineStyle = css`
  ${ gridColWidth(21, ) };

`

const Portfolio = () => {

    const containerRef = useRef(null);
    const {setDotIndex} = useContext(AppStateContext);

    const intersection = useIntersection(containerRef, {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: .6,
    })

    useEffect(() => {
        if(intersection && intersection.isIntersecting) {
            setDotIndex(3)
        }

    }, [intersection])


    return (
        <PortfolioContainer ref={containerRef}
                            // data-scroll-call="portfolio"
                            // data-scroll-id='portfolio'
                            // data-scroll
                            // data-scroll-repeat={true}

                            id='portfolio'>





            <Diagonal/>

        </PortfolioContainer>
    );
};

export default Portfolio;
