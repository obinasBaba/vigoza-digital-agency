import React from 'react';
import styled, {css} from "styled-components";
import {heightWidth, largeUp, mediumUp, spacing} from "../../../styles/mixins";
import HideOnScroll from "./HideOnScroll";
import {motion} from "framer-motion";
import {Button, Typography} from "@material-ui/core";

const AppBarContainer = styled.div`

  position: absolute;
  //z-index: 20;
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
  
  & > * {
    pointer-events: initial;
    cursor: none;
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
    // fill: ${props =>  props.theme.palette.primary.light};
    fill: ${({menuIsOpen}) => menuIsOpen ? ' var(--accent400)' : 'gray'};
    opacity: .8;
  }
`

const MenuButton = styled.div`
    position: relative;
  
  .menuButton {
    position: relative;
    overflow: hidden;
    outline: none;
    border: none;
    border-radius: 50%;
    background-color: transparent;
    transition: all 0.3s;

    ${heightWidth('height', 5)};
    ${heightWidth('width', 5)};

    // fix for safari bug when overflow hidden doesn't work for round corners
    // https://forum.webflow.com/t/overflow-hidden-round-corners-not-working-on-safari/67805
    backface-visibility: hidden;
    transform: translate3d(0, 0, 0);

    ${largeUp( css`
      &:hover {

        &:after {
          transform: translateX(0%);
        }
        
        .menuIcon, .menuIcon::before, .menuIcon::after {
          background-color: ${({menuIsOpen}) => menuIsOpen ? ' var(--accent700)' : ' var(--accent400)'};
        }
      }
      
    ` )};


    .menuIcon {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      display: block;
      border-radius: 35px;
      width: 37%;
      height: 0.15rem;
      margin: auto;
      background-color: ${({menuIsOpen}) => menuIsOpen ? ' var(--accent400)' : 'gray'};
      //background-color:  var(--accent400);
      transition: all 0.3s;

      &:before,
      &:after {
        content: '';
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        display: block;
        border-radius: 35px;
        height: 0.15rem;
        width: 70%;
        //background-color: gray;
        background-color: ${({menuIsOpen}) => menuIsOpen ? ' var(--accent400)' : 'gray'};

        //background-color:  var(--accent400);

        transition: all 0.3s;
      }

      &:before {
        margin-top: -0.5rem;
      }

      &:after {
        margin-top: 0.5rem;
      }

      &[data-status='true'] {
        background-color: transparent;

        &:before {
          top: 0.45rem;
          transform: translateX(-50%) rotate(45deg);
          width: 100%;
        }

        &:after {
          top: -0.55rem;
          transform: translateX(-50%) rotate(-45deg);
          width: 100%;
        }
      }
    }

    .hiddenTitle {
      position: absolute;
      left: -9999px;
    }
  }

`

const AppBar = ({ onClick, status, ...props}) => {



    return (
        <HideOnScroll >
            <AppBarContainer>
                <Logo menuIsOpen={status} >
                    <svg xmlns="http://www.w3.org/2000/svg"
                         width="100%" height="100%" viewBox="0 0 536.905 274.632">
                        <path id="Subtraction_16" data-name="Subtraction 16" d="M2308.212-605.949h-253.43v-58.936l41.73-42.533,3.177-3.278,88.857,1.353-1.9,1.925-42.453,42.533h164.022v58.936Zm-354.517,0H1891.6L1771.307-879.67H1849.4l86.128,172.251,71.911-173.163h294.339v55.673l-35.956,37.383-14.117,14.282-91.125-.3,13.549-13.983,37.256-37.383H2065.465L1953.7-605.95Z" transform="translate(-1771.307 880.582)" fill="#fff"/>
                    </svg>
                </Logo>


                <MenuButton menuIsOpen={status}>
                    <button
                        type="button"
                        className={'menuButton'}
                        data-pointer={true}
                        onClick={onClick}
                    >
                        <span className={'menuIcon'} data-status={status}/>
                        <span className={'hiddenTitle'}>Menu</span>
                    </button>
                </MenuButton>


            </AppBarContainer>
        </HideOnScroll>
    );
};

export default AppBar;
