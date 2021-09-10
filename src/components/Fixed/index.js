import React from 'react';
import styled from "styled-components";
import CustomMouse from "./CustomMouse";
import ScrollProgressCircle from "../ScrollProgressCircle";
import Pagination from "../nav";

const FixedContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 10;
  
  pointer-events: none;
  
`

const Fixed = () => {
    return (
        <FixedContainer>
            <CustomMouse/>
            <Pagination/>
            <ScrollProgressCircle/>
        </FixedContainer>
    );
};

export default Fixed;
