import React from 'react';
import styled, {css} from "styled-components";
import {motion, MotionValue} from "framer-motion";
import {lerp} from "../../../helpers/utils";
import gsap from "gsap";


const commonMouse = css`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 15;
  border-radius: 50%;
`

const Outer = styled(motion.div)`
  ${commonMouse};

  border: 2px solid rgba(255, 69, 0, 0.86);
  height: 50px;
  width: 50px;
  top: -25px;
  left: -25px;
`

const Inner = styled(motion.div)`
  ${commonMouse};

  background-color: black;
  height: 12px;
  width: 12px;
  background-blend-mode: difference;
  top: -6px;
  left: -6px;
`




class PointerCursor extends React.Component {
    trackMousePos = (ev) => {
        this.x.set(ev.clientX)
        this.y.set(ev.clientY)
    }

    static p
    lastX;
    lastY;
    x;
    y;

    constructor(props) {
        super(props);

        this.lastX = new MotionValue(0)
        this.lastY = new MotionValue(0)

        this.x = new MotionValue(100)
        this.y = new MotionValue(100)

        this.pointerRef = React.createRef()
        PointerCursor.p = this.pointerRef
    }

    updateMousePos(){
        const render = () => {
            this.lastX.set(lerp(this.lastX.get(), this.x.get(), 0.14))
            this.lastY.set(lerp(this.lastY.get(), this.y.get(), 0.14))

            requestAnimationFrame(() => render())
        }

        requestAnimationFrame(() => render())
    }

    componentDidMount() {

        window.addEventListener('mousemove', this.trackMousePos)

        this.updateMousePos()
    }

    componentWillUnmount() {

        window.removeEventListener('mousemove', this.trackMousePos)
    }

    static hidePointer(){
        gsap.to(this.p.current,  {
            opacity: 0,
            duration: .3
        })
    }

    static showPointer(){
        gsap.to(this.p.current,  {
            opacity: 1,
            duration: .3,
        })
    }

    render() {
        return (
            <motion.div>
                <motion.div ref={this.pointerRef}>
                    <Outer style={{x: this.lastX, y: this.lastY}}/>
                    <Inner style={{x: this.x, y: this.y,}}/>
                </motion.div>

            </motion.div>
        );
    }
}

export default PointerCursor;