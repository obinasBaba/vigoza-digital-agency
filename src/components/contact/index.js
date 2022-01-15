import React, {useContext, useEffect, useRef, useState} from 'react';
import styled from "styled-components";
import {gridColWidth, gridify} from "../../styles/mixins";
import ContactForm from "./ContactForm";
import ContactSocial from "./ContactSocial";
import {AppStateContext} from "../../contexts/AppStateContext";
import {useIntersection} from "react-use";

const ContactContainer = styled.section`
  position: relative;
  min-height: 100vh;
  width: 100%;
  ${gridify()};
  
  .social{
    ${ gridColWidth(1, 30) };
  }
  
  .form{
    ${ gridColWidth(30, 65) };
  }
`

const Contact = () => {

    const containerRef = useRef(null);
    const [inView, setInView] = useState(false);
    const {setDotIndex} = useContext(AppStateContext);


    const intersection = useIntersection(containerRef, {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: .6,
    })

    useEffect(() => {
        if(intersection && intersection.isIntersecting) {
            setInView(true)
            setDotIndex(5)
        }


    }, [intersection])

    return (
        <ContactContainer ref={containerRef}
                          // data-scroll-section
                          data-scroll-call="contact"
                          data-scroll-id='contact'
                          data-scroll
                          data-scroll-repeat={true}

                          id='contact'>

            <ContactSocial/>
            <ContactForm/>

        </ContactContainer>
    );
};

export default Contact;
