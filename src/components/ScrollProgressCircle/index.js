import { motion, useTransform, useViewportScroll } from 'framer-motion'
import React, {useContext, useEffect, useRef} from 'react'
import styled from 'styled-components'
import { heightWidth, spacing} from "../../styles/mixins";
import {AppStateContext} from "../../contexts/AppStateContext";
import {map} from "../../helpers/utils";

const ProgressContainer = styled(motion.div)`
  position: absolute;
  top: calc(100vh - calc(var(--size) * 6rem));
  bottom: auto;
  right: 0;

  // ${spacing('mb', -6)}
  ${spacing('mr', 6)}

  ${heightWidth('width', 4.5)};
  ${heightWidth('height', 4.5)};

  & * {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .border {
    border-radius: 500px;
    border: 3px solid;
  }
`

const topPathVariant = {
  initial: {
    strokeWidth: 3,
    stroke: '#535353'
  }
}


const bottomPathVariant = {
  initial: {
    pathLength: 0,
    stroke: 'var(--accent700)',
    strokeWidth: 5
  },
}

const ScrollProgressCircle = () => {

  const {
    moScroll: {y, limit},
  } = useContext( AppStateContext )

  const rotate = useTransform(y, latest => {
    return map(latest, 0, limit.get(), 0, 360)
  })

  const pathLength = useTransform(rotate, [0, 360], [0, 1])


  return (
    <>
      <ProgressContainer  style={{ rotate }}>

        <motion.svg xmlns="http://www.w3.org/2000/svg"
                    width="100%" height="100%" viewBox="0 0 101.001 101.042"
                    variants={{}}
                    initial='initial'
                    animate='animate'

        >
          <motion.g id="circle" transform="translate(-51.033 -692.945)">


            <motion.path id="top" d="M99.914,693.554c6.967-.8,51.626,3.722,51.62,53.12-1.324,27.374-27.015,48.149-51.556,46.733-25.351-.75-46.427-19.98-48.43-46.737C50.672,700.788,92.086,692.979,99.914,693.554Z" transform="translate(0)"
                         fill="none"
                         variants={topPathVariant}
            />

            <motion.path id="bottom" d="M99.914,693.554c6.967-.8,51.626,3.722,51.62,53.12-1.324,27.374-27.015,48.149-51.556,46.733-25.351-.75-46.427-19.98-48.43-46.737C50.672,700.788,92.086,692.979,99.914,693.554Z" transform="translate(0)"
                  fill="none" stroke="#ffffff"
                         style={{pathLength}}
                         variants={bottomPathVariant}


            />
          </motion.g>
        </motion.svg>


      </ProgressContainer>
    </>
  )
}

export default ScrollProgressCircle