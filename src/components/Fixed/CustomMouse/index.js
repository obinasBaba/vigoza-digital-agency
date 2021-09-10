import React, {useEffect} from 'react';
import styled, {css} from "styled-components";
import {motion, useMotionValue} from "framer-motion";
import {lerp} from "../../../helpers/utils";

const commonMouse = css`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 15;
  border-radius: 50%;
`

const Outer =  styled( motion.div )`
  ${commonMouse};

  border: 2px solid rgba(255, 69, 0, 0.86);
  height: 50px;
  width: 50px;
  top: -25px;
  left: -25px;
`

const Inner = styled( motion.div )`
  ${commonMouse};

  background-color: black;
  height: 12px;
  width: 12px;
  background-blend-mode: difference;
  top: -6px;
  left: -6px;
`


const CustomMouse = () => {

    let lastX = useMotionValue(0)
    let lastY = useMotionValue(0)

    let x = useMotionValue(100)
    let y = useMotionValue(100)

    useEffect(() => {
        const trackMousePos = (ev) => {
            x.set(ev.clientX)
            y.set(ev.clientY)
        }

        window.addEventListener('mousemove', trackMousePos)

        updateMousePos()

        return () => window.removeEventListener('mousemove', trackMousePos)

    }, [])

    const updateMousePos = () => {
        const render = () => {
            lastX.set(lerp(lastX.get(), x.get(), 0.14))
            lastY.set(lerp(lastY.get(), y.get(), 0.14))

            requestAnimationFrame(() => render())
        }

        requestAnimationFrame( () => render() )
    }

    return (
        <>
            <Outer style={{x: lastX, y: lastY}} />
            <Inner style={{x, y,}}/>
        </>
    );
};

export default CustomMouse;
