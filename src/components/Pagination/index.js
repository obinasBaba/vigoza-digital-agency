import React, {useContext, useEffect} from 'react';
import {Typography} from "@material-ui/core";
import styled, {css} from 'styled-components'
import {heightWidth, smallUp, spacing, text} from "../../styles/mixins";
import {AnimatePresence, AnimateSharedLayout, motion} from "framer-motion";
import {AppStateContext} from "../../contexts/AppStateContext";

const PaginationContainer = styled(motion.div)`
  position: absolute;
  left: 3%;
  top: 50%;
  transform: translateY(-50%);
  display: none;
  flex-flow: column;
  //border: var(--border);
  padding-left: 1%;
  pointer-events: auto;

  & * {
    pointer-events: auto;
  }

  ${spacing('gap', 2)};

  ${smallUp(css`
    display: flex;
  `)};
`;


const Dot = styled.div`
  //width: 0.9375rem;
  //height: 0.9375rem;
  ${heightWidth('height', 1)};
  ${heightWidth('width', 1)};

  transform: translateX(-50%);
  border-radius: 50%;
  background-color: ${props => props.active ? 'var(--accent500)' : props.theme.palette.primary.light};
  cursor: pointer;

`

const StyledActiveDot = styled(motion.div)`
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
  height: 60px;
  background-color: var(--accent400);
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

                <Typography variant='h1' style={{
                    color: 'var(--accent500)',
                }}>0{index + 1}</Typography>

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


    const {dotIndex, setDotIndex} = useContext(AppStateContext);
    const anchors = ['welcome', 'about', 'service', 'portfolio', 'blog', 'contact'];


    const handleClick = (idx) => {
        if (!window.locoInstance) return;

        window.locoInstance.scrollTo(`#${anchors[idx]}`, {
            easing: [1, 0.1, 0.23, 0.96],
        })

        setDotIndex(idx)
    }

    Pagination.ScrollPaginationTo = (sectionId) => {
        console.log('setDotIndex : ', sectionId)
        if (anchors.includes(sectionId))
            setDotIndex( anchors.indexOf(sectionId) )

    }

    return (
        <AnimateSharedLayout>
        <PaginationContainer>
            {
                anchors.map((i, index) =>
                    dotIndex === index ?
                        <ActiveDot key={index}
                                   text={i}
                                   index={index}/>

                        : <Dot onClick={() => handleClick(index)}
                               key={index}/>)
            }
        </PaginationContainer>
        </AnimateSharedLayout>

    );
};

export default Pagination;
