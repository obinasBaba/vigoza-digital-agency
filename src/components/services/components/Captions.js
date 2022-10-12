import React from 'react';
import styled, { css } from "styled-components";
import { gridColWidth, heightWidth, largeUp, mediumUp, spacing } from "../../../styles/mixins";
import { Typography } from "@material-ui/core";

const CaptionsContainer = styled.div`

  grid-row: 3;

  display: flex;
  flex-flow: column;
  align-items: start;

  & > :last-child {
    ${spacing( 'ml', 8 )}
  }

  & > :nth-child(2n) {
    ${spacing( 'ml', 12 )}
  }

  ${heightWidth( 'gap', 3 )}
  ${spacing( 'mt', 6 )}
  ${gridColWidth( 17, )};

  ${mediumUp( css`
    grid-row: 2;
    ${gridColWidth( 30, )};

  ` )};
`

const Title = styled( Typography )`
  text-shadow: 0.1em 0.1em 0.3em #000;
  position: relative;
  z-index: 1;
  display: inline-block;
  font-weight: bold;
  letter-spacing: 3px;

  &::before {
    ${( { letter } ) => css`
      content: '${letter}';
    `};
    position: absolute;
    text-shadow: initial;
    display: inline-block;
    font-family: var(--poppins);
    font-size: 3em;

    z-index: -1;
    color: var(--accent700);
    transform: translateY(-37%) translateX(-50%);
    opacity: .2;
  }
`

const Caption = styled.div`
  max-width: 34ch;

  & > * {
    color: whitesmoke;
  }

  & > .title {
    color: var(--accent300);
  }


  & > :last-child {
    ${spacing( 'ml', 1 )}
    ${spacing( 'mt', 1 )}
  }

  ${( { pos } ) => css`
    align-self: ${pos};
  `}
`

const Captions = () => {
    return (<CaptionsContainer>
        <Caption pos='flex-start'>
            <Title variant='body2'

                   letter='I'
                   className="title">INDUSTRIAL DESIGN</Title>

            <Typography variant='subtitle2' className='txt'>
                our process of design applied to physical products that are to be manufactured by mass
                production.</Typography>

        </Caption>

        <Caption pos='center'>
            <Title variant='body2'
                   letter='w'
                   className="title">WEB DESIGN</Title>

            <Typography variant='subtitle2' className='txt'>We're Soocial, a leading branding agency with a passion
                for creating memorable names and internationally-renowned brands.</Typography>

        </Caption>

        <Caption pos='flex-start'>
            <Title variant='body2'
                   letter='p'
                   color='textSecondary'
                   className="title">PHOTOGRPAHY</Title>

            <Typography variant='subtitle2' className='txt'>Since our launch, we’ve worked on more than 1,000
                projects for clients around the world. Design is more than what it looks like and feels like. Design
                is how it works.</Typography>

        </Caption>
    </CaptionsContainer>);
};

export default Captions;
