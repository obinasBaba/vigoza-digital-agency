import React from 'react';
import styled from "styled-components";
import {heightWidth, spacing} from "../../styles/mixins";
import {TextField} from "@material-ui/core";
import MotionBtn from "../MotionBtn";

const FormContainer = styled.div`
  background-image: url("img/map-bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  display: flex;
`

const Form = styled.div`
  display: flex;
  flex-flow: column;
  background: rgba(234, 232, 232, 0.6);
  backdrop-filter: blur(3px);
  width: max-content;
  margin-top: auto;
  border-radius: 20px;
  color: black !important;
  
  & > :first-child {
    & > :last-child {
      margin-left: 2rem;
    }
  }

  ${spacing('p', 5)};
  ${spacing('ml', 2)};
  ${spacing('mb', 2)};
  ${heightWidth('gap', 3)};
`

const ContactForm = () => {
    return (
        <FormContainer className='form'>
            <Form>

                <div>
                    <TextField variant='outlined' color='secondary'
                               label='Your Name' inputMode='text'/>
                    <TextField variant='outlined' color='secondary'
                               label='Your E-mail' inputMode='email' />
                </div>

                <TextField variant='outlined' color='secondary'
                           label='Your Topic' inputMode='text'/>

                <TextField variant='outlined' label='Message' inputMode='text'
                           color='secondary' multiline rows={4}/>

                <MotionBtn txt='Send Message' />
            </Form>

        </FormContainer>
    );
};

export default ContactForm;
