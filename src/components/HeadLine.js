import React from 'react';
import styled, {css} from "styled-components";
import {gridColWidth, heightWidth, mediumUp, spacing, text} from "../styles/mixins";
import {Typography} from "@material-ui/core";

const HeadLineContainer = styled.div`
  position: relative;
  align-self: center;
  justify-self: start;
  z-index: 1;
  //border: thin solid  red;
  
  ${ gridColWidth(18, ) }
  ${spacing('mb', 5)}

  .title {
    font-size: 2.3rem;
    letter-spacing: 10px;
    font-weight: 400;

    &::after {
      content: '';
      display: block;
      height: 2px;
      width: 116%;
      background: var(--accent700);
      margin-top: .3em;
    }
  }
`

const Effect = styled.h1`
  position: absolute;
  top: 0;
  left: 19%;
  margin: 0;
  display: inline;
  font-family: var(--raisonne-br);
  opacity: .05;
  z-index: -1;
  transform: translateY(-30%);
  
  ${heightWidth('letter-spacing', 6)}
  ${text(7)}
`

const HeadLine = () => {
    return (
        <HeadLineContainer>
            <Effect>SERVICE</Effect>
            <Typography className='title' variant='h1' >SERVICES</Typography>
        </HeadLineContainer>
    );
};

export default HeadLine;
