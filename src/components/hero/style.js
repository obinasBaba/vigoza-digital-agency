import styled, {keyframes} from "styled-components";
import {Grid as MuiGrid} from "@material-ui/core";



const scrollAnim = keyframes`
  from {
    left: -34.5px;
  }

  to {
    left: -10px;
  }
`


export const ScrollDown = styled.div`

  border-bottom: 3px solid ${({theme}) => theme.palette.primary.dark};
  transform: rotate(90deg);
  transform-origin: left;
  padding-bottom: 0px;
  text-indent: 30px;
  position: absolute;
  left: 30%;
  right: 0;
  width: 400px;
  bottom: 220px;

  &::after, &::before {
    content: '';
    margin: 0;
    position: absolute;
    left: -37px;
    top: 100%;
    transform: translateY(calc(-42% ));
  }

  &::before {
    color: inherit;
    border-radius: 50px;
    width: 40px;
    height: 25px;
    border: 3px solid ${({theme}) => theme.palette.primary.dark};
  }

  &::after {
    top: 103%;
    border-radius: 100px;
    width: 10px;
    height: 5px;
    background-color: ${({theme}) => theme.palette.secondary.main};
    animation: ${scrollAnim} 1s linear infinite alternate both;
  }

  
  & > :first-child{
    text-transform: uppercase;
    font-weight: lighter;
    //color: ${ props => props.theme.palette.primary.light };
    letter-spacing: 3px;
  }
  
`;
