// noinspection CssUnknownTarget

import React, {useContext, useEffect, useRef} from 'react';
import {AppStateContext} from "../../contexts/AppStateContext";
import {useIntersection} from "react-use";
import styled, {css} from "styled-components";
import {gridify, mediumUp, spacing} from "../../styles/mixins";
import HeadLine from "../HeadLine";
import ServiceList from "./components/ServiceList";
import {Typography} from "@material-ui/core";
import Captions from "./components/Captions";

const ServicesContainer = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  width: 100%;
  //border: thick solid red;
  overflow: hidden;
  background-image: url("img/services_bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-bottom: -1px; //hide the smooth scroll pixel stuttering problem
  

  ${gridify()}
  ${spacing('pt', 15)}
  ${spacing('pb', 8)}


  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.3);
    z-index: -1;
  }
`

const Services = () => {

    const containerRef = useRef(null);
    const {setDotIndex} = useContext(AppStateContext);

    const intersection = useIntersection(containerRef, {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: .6,
    })

    useEffect(() => {
        if(intersection && intersection.isIntersecting) {
            setDotIndex(2)
        }

    }, [intersection])

    return (

        <ServicesContainer  ref={containerRef}
                            // data-scroll-section
                            data-scroll-call="service"
                            data-scroll
                            data-scroll-repeat={true}
                            data-scroll-id='service'


                            id='service'
        >

            <HeadLine text='Services' effect='SERVICES' />

            <ServiceList/>

            <Captions />

        </ServicesContainer>
    );
};

export default Services;
