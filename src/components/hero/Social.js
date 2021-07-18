import React from 'react';
import {Grid, IconButton} from "@material-ui/core";
import {Facebook, Instagram, Pinterest, Twitter} from "@material-ui/icons";
import {grey} from "@material-ui/core/colors";
import styled from "styled-components";

const SocialContainer = styled(Grid)`

  & > *:hover {
    & *{
      color: var(--accent500);
    }
  }
`

const Social = () => {
    return (
        <SocialContainer item container xs={1} direction='column'
                         alignItems='center' justify='center'>

            <IconButton edge='start'>
                <Facebook style={{color: grey[500]}} fontSize='small'/>
            </IconButton>
            <IconButton edge='start'>
                <Instagram style={{color: grey[500]}} fontSize='small'/>
            </IconButton>
            <IconButton edge='start'>
                <Twitter style={{color: grey[500]}} fontSize='small'/>
            </IconButton>
            <IconButton edge='start'>
                <Pinterest style={{color: grey[500]}} fontSize='small'/>
            </IconButton>
        </SocialContainer>
    );
};

export default Social;
