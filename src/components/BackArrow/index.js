import React from 'react';
import {Link} from "react-router-dom";
import styled from "styled-components";
import {spacing} from "../../styles/mixins";
import { useUI } from "../../contexts/UIStateContext";

const BackArrowContainer = styled.div`
  position: relative;
  transform: rotate(180deg);


  ${spacing('height', 4)};
  ${spacing('width', 4)};
  
  ${spacing('ml', -2)};
  ${spacing('mb', 2)};
  
  
    svg{
      height: 100%;
      width: 100%;
    }
  
  a{
    position: absolute;
    height: 100%;
    width: 100%;
    inset: 0;
  }
`


const BackArrow = () => {


    return (
        <BackArrowContainer className="item__content-back"
                   data-pointer
        >
            <svg viewBox="0 0 117.25 86.75">
                <path className="arrow-cursor__path"
                      d="M111.45,42.5,74.65,5.7l-9.9,9.9,20.6,20.6H6.45v14h78.9L64.75,70.8l9.9,9.9,36.8-36.8A1,1,0,0,0,111.45,42.5Z"
                      fill='none' strokeWidth='3.5' stroke='rgba(255, 69, 0, 0.92)'
                      strokeLinecap='round' strokeLinejoin='round'

                />
            </svg>
        </BackArrowContainer>
    );
};

export default BackArrow;
