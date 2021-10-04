import React from 'react';
import styled from "styled-components";
import {heightWidth, spacing} from "../../styles/mixins";
import {Typography} from "@material-ui/core";

const MenuContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: flex-start;
  
  h5{
    letter-spacing: 1px;
    font-weight: bold;
    -webkit-text-stroke: 1px white;
    color: transparent;
  }
  
  & *{
    cursor: pointer;
  }
  
  ${heightWidth('gap', 2)};
  ${spacing('mt', 6)};
  
  

  .dots {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    
    & > :nth-child(2n + 3){
      background: white;
    }

    & * {
      height: 15px;
      width: 15px;
      background: grey;
      border-radius: 50%;
    }
  }
`

const Menu = () => {
    return (
        <MenuContainer>
            <Typography variant='h5' >INDUSTRIAL DESIGN</Typography>
            <Typography variant='h5' color='textSecondary'>WEB DESIGN</Typography>
            <Typography variant='h5' color='textSecondary'>PHOTOGRAPHY</Typography>

            <div className="dots">
                <span/>
                <span/>
                <span/>
                <span/>
            </div>
        </MenuContainer>
    );
};

export default Menu;
