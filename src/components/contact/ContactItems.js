import React from 'react';
import styled from "styled-components";
import {LocationCity, Mail, Phone} from "@material-ui/icons";
import {Typography} from "@material-ui/core";
import {gridColWidth, heightWidth} from "../../styles/mixins";

const ContactItemsContainer = styled.div`
  display: flex;
  flex-flow: column;

  ${heightWidth('gap', 2.6)};
  ${gridColWidth(27,)};
`


const ContactItemContainer = styled.div`
  display: flex;

  ${heightWidth('gap', 2)};
  //align-items: center;


  .txt {
    display: flex;
    flex-flow: column;
    align-items: flex-start;
    //align-self: flex-start;

    span{
      color: gray;
    }

    & > :first-child{
      color: lightgray;
      font-weight: bolder;
    }
  }
`
const ContactItem = ({Icon, title, subTitle}) => {
    return (
        <ContactItemContainer>
            {Icon}
            <div className="txt">
                <Typography variant='body1'>{title}</Typography>
                <Typography variant='subtitle2' color='textSecondary'> {
                    subTitle.split(',').map(t => <span key={t}>{t} <br/></span>)
                }</Typography>
            </div>

        </ContactItemContainer>
    );
};


const ContactItems = () => {
    return (
        <ContactItemsContainer>
            <ContactItem Icon={<Mail style={{color: 'lightgray'}}/>}
                         title='E-mail'
                         key={'email'}
                         subTitle='henokgetachew@gmail.com'/>

            <ContactItem Icon={<Phone style={{color: 'lightgray'}}/>}
                         title='Phone'
                         key={'phone'}
                         subTitle='+251 923 3655 39'/>

            <ContactItem Icon={<LocationCity style={{color: 'lightgray'}}/>}
                         title='Address'
                         key={'address'}
                         subTitle={'Vigoza inc., 76 Main Road, Addis Abeba. 6060, Ethiopia.'}
            />

        </ContactItemsContainer>
    );
};

export default ContactItems;
