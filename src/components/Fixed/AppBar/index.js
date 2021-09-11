import React from 'react';
import styled, {css} from "styled-components";
import {mediumUp, spacing} from "../../../styles/mixins";
import HideOnScroll from "./HideOnScroll";
import {motion} from "framer-motion";

const AppBarContainer = styled.div`

  position: absolute;
  z-index: 20;
  top: 0;
  width: 100%;
  padding: 2rem 2rem 1.3rem;
  transition: all .35s ease-in-out;
  pointer-events: none;
  
  //border: thin solid red;

  display: flex;
  justify-content: space-between;

  &::after {
    //content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    //background-image: var(--head-gradient);
    opacity: var(--head-opacity);
    transition: all .35s ease-in-out;
  }


  ${mediumUp(css`
    ${spacing('pv', 2)};
    ${spacing('ph', 3.5)};
  `)};

`

const Logo = styled( motion.div )`
  max-height: 50px;
  max-width: 50px;
  
  path{
    fill: ${props =>  props.theme.palette.primary.light};
    opacity: .8;
  }
`

const AppBar = () => {
    return (
        <HideOnScroll >
            <AppBarContainer>
                <Logo>
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="100%" height="100%" viewBox="0 0 536.905 274.632">
                        <path id="Subtraction_16" data-name="Subtraction 16" d="M2308.212-605.949h-253.43v-58.936l41.73-42.533,3.177-3.278,88.857,1.353-1.9,1.925-42.453,42.533h164.022v58.936Zm-354.517,0H1891.6L1771.307-879.67H1849.4l86.128,172.251,71.911-173.163h294.339v55.673l-35.956,37.383-14.117,14.282-91.125-.3,13.549-13.983,37.256-37.383H2065.465L1953.7-605.95Z" transform="translate(-1771.307 880.582)" fill="#fff"/>
                    </svg>
                </Logo>



            </AppBarContainer>
        </HideOnScroll>
    );
};

export default AppBar;
