import React from 'react';
import styled, {css} from "styled-components";
import HeadLine from "../HeadLine";
import {gridColWidth, gridify} from "../../styles/mixins";
import ContactItems from "./ContactItems";

const ContactSocialContainer = styled.div`
  background-image: url("img/contact-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center right;
  
  ${ gridify() };
  align-items: start;
  justify-content: center;
`

const headLineStyles = css`
  ${ gridColWidth(27,) };
  
`


const ContactSocial = () => {
    return (
        <ContactSocialContainer className='social'>
            <HeadLine text='CONTACT' styles={ headLineStyles } />
            <ContactItems/>

        </ContactSocialContainer>
    );
};

export default ContactSocial;
