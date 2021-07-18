// @flow

import React, {useState} from 'react';
import {Typography} from "@material-ui/core";
import styled, {css} from 'styled-components'
import {heightWidth, smallUp, spacing, text} from "../../styles/mixins";
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion";

const Wrapper = styled(motion.div)`
  position: fixed;
  z-index: 9999;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-flow: column;
  //border: var(--border);
  padding-left: 1%;

  ${spacing('gap', 2)};

  ${smallUp(css`
    display: flex;
  `)};
`;

type DotProps = {
    active: boolean;
}


const Dot = styled<DotProps>('div')`
  //width: 0.9375rem;
  //height: 0.9375rem;
  ${heightWidth('height', 1)};
  ${heightWidth('width', 1)};

  transform: translateX(-50%);
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--accent500)' : props.theme.palette.primary.light};
  cursor: pointer;
`

const StyledActiveDot = styled( motion.div )`
  display: flex;
  flex-flow: wrap column;
  justify-content: start;
  ${spacing('gap', 1.5)};

  h1 {
    ${text(3)};
    align-self: start;
    transform: translateX(-50%);
    line-height: .8;
  }

`;

const Stick = styled.span`
  width: 2px;
  height: 100px;
  background-color: var(--accent300);
  transform: translateX(-50%);
`

const DotWrapper = styled('div')`
  display: flex;
  ${spacing('gap', 1)};

  //justify-content: center;
  align-items: center;

  p {
    letter-spacing: 1px;
    color: var(--accent500);
  }
`
export const transition = {
    ease: [0.6, 0.01, 0, 0.9],
    duration: 1,
}

const activeDotVariant = {
    initial: {
        opacity: 0,
    },
    animate: {
        opacity: 1,
    },
    exit: {
        opacity: 0
    }
}

const ActiveDot = ({index, text}) => {
    return (
        <AnimatePresence>

        <StyledActiveDot variants={activeDotVariant}
                         transition={transition}
                         initial='initial'
                         animate='animate'
                         exit='exit'
        >

            <Typography variant='h1'>0{index + 1}</Typography>

            <DotWrapper>
                <Dot active/>
                <Typography>{text}</Typography>
            </DotWrapper>

            <Stick/>
        </StyledActiveDot>
        </AnimatePresence>

    );
}


const Pagination = () => {

    const [active, setActive] = useState(0);
    const anchors = ['welcome', 'about', 'service',
        'portfolio', 'blog', 'contact'];

    const handleClick = (index) => {
        setActive(index)
    }

    return (
        // <AnimateSharedLayout>
            <Wrapper>
                {
                    anchors.map((i, index) =>
                        active === index ?
                            <ActiveDot key={index}
                                       text={i}
                                       index={index}/>

                            : <Dot onClick={evt => handleClick(index)}
                                   key={index}/>)
                }
            </Wrapper>
        // </AnimateSharedLayout>

    );
};

export default Pagination;
