import React from 'react';
import styled, {css} from "styled-components";
import {gridColWidth, mediumUp, spacing} from "../../../styles/mixins";
import {Typography} from "@material-ui/core";


const ServiceListContainer = styled.div`
  font-size: .9rem;
  letter-spacing: 2px;
  justify-self: start;
  align-self: start;
  padding: 0;
  grid-row: 2;

  ${spacing('mt', 10)}
  ${ gridColWidth(13, ) }

  & *{
    font-weight: bold;
    letter-spacing: 3px;
  }
  
  & > :not( :first-child ){
    ${ spacing('mt', 1) }
  }
  
  .selected {
    position: relative;
    color: var(--accent300);
    //font-weight: 600;

    &::before {
      position: absolute;
      top: 0;
      left: -12px;
      bottom: 0;
      content: '';
      display: inline-block;
      width: 3px;
      height: 100%;
      background: var(--accent500);

    }
  }
`

const ServiceList = () => {
    return (
        <ServiceListContainer>
            <Typography  variant='body2' color='textSecondary' >BACKEND DEVELOPMENT</Typography>
            <Typography variant='body2'  color='textSecondary' className="selected">WEB DESIGN</Typography>
            <Typography variant='body2' color='textSecondary'>MOBILE DEVELOPMENT</Typography>
        </ServiceListContainer>
    );
};

export default ServiceList;
