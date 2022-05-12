import React from 'react';
import styled from "styled-components";
import { useUI } from "../../../contexts/UIStateContext";
import CaseStudy from "../../../scenes/CaseStudy";
import { AnimatePresence } from "framer-motion";

const CaseStudyModalContainer = styled.div`
  position: absolute;
  pointer-events: none;
  inset: 0;
`

const CaseStudyModal = () => {

    const { state } = useUI();


    return (

        <CaseStudyModalContainer>

            <AnimatePresence exitBeforeEnter>

                {
                    state.displayCaseStudy && <CaseStudy/>

                }

            </AnimatePresence>

        </CaseStudyModalContainer>
    );
};

export default CaseStudyModal;
