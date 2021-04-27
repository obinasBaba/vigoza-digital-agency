// @flow

import React, {useState} from 'react';
import {Typography} from "@material-ui/core";
import styled from 'styled-components'

const Wrapper = styled.div`
  ${ ({theme}) => `
      ${ theme.breakpoints.up( 'sm' ) } {
        display: flex;
      }
  ` }

  position: fixed;
  z-index: 9999;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-flow: column;
  gap: 30px;
`;

type DotProps = {
    active: boolean;
}

const Dot = styled<DotProps>( 'div' )`
  width: 0.9375rem;
  height: 0.9375rem;
  border-radius: 50%;
  background-color: ${ props => props.active ? 'white' : props.theme.palette.primary.light };
  cursor: pointer;
`

const StyledActiveDot = styled( 'div' )`
  display: flex;
  flex-flow: wrap column;
  justify-content: start;
  gap: 30px;
  
  & > :nth-child(3){
    margin-left: calc(0.9375rem / 2 - 3px);
  }
  
  & > :first-child{
    transform: translateX(-40%);
    margin-right: auto;
    font-size: 3rem;
  }
  
`;

// noinspection JSUnresolvedFunction
const Stick = styled.span`
  //border-left: 3px solid white;
  width: 3px;
  height: 100px;
  background-color: white;
`

const DotWrapper = styled( 'div' )`
  display: flex;
  gap: 30px;
  //justify-content: center;
  align-items: center;
`

const ActiveDot = ({index, text}) => {
    return (
        <StyledActiveDot>

            <Typography variant='h1' >0{ index + 1 }</Typography>

            <DotWrapper>
                <Dot active/>
                <Typography  >{ text }</Typography>
            </DotWrapper>

            <Stick/>
        </StyledActiveDot>
    );
}


const Pagination = () => {

    const [active, setActive] = useState( 0 );

    const handleClick = (index) => {
        setActive( index )
    }

    return (
        <Wrapper>


            {
                ['welcome', 'about', 'service',
                    'portfolio', 'blog', 'contact']

                    .map( (i, index) =>
                        active === index ? <ActiveDot key={ index }
                                                      text={ i }
                                                      index={ index }/> : <Dot onClick={ evt => handleClick( index ) }
                                                                               key={ index }/> )
            }
        </Wrapper>
    );
};

export default Pagination;
