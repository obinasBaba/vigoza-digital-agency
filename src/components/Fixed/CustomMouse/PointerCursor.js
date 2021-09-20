import React from 'react';
import styled, {css} from "styled-components";
import {motion, MotionValue} from "framer-motion";
import {lerp} from "../../../helpers/utils";
import gsap from "gsap";


const commonMouse = css`
  pointer-events: none;
  position: absolute;
  inset: 0;
  border-radius: 50%;
`

const MouseContainer = styled.div`
  position: relative;
  z-index: 15;
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
  top: -6px;
  left: -6px;
  background-blend-mode: difference;
  mix-blend-mode: difference;
`




class PointerCursor extends React.Component {


    trackMousePos = (ev) => {
        PointerCursor.x.set(ev.clientX)
        PointerCursor.y.set(ev.clientY)
        PointerCursor.direction = this.lastY.get() - ev.clientY > 0 ? 'up' : 'down';
    }

    static x = new MotionValue(0);
    static y = new MotionValue(0);
    static direction = 'up'
    lastX= new MotionValue(0);
    lastY= new MotionValue(0);

    constructor(props) {
        super(props);

        this.pointerRef = React.createRef()

    }

    updateMousePos(){
        const render = () => {
            this.lastX.set(lerp(this.lastX.get(), PointerCursor.x.get(), 0.18))
            this.lastY.set(lerp(this.lastY.get(), PointerCursor.y.get(), 0.18))

            requestAnimationFrame(() => render())
        }

        requestAnimationFrame(() => render())
    }

    componentDidMount() {

        window.addEventListener('mousemove', this.trackMousePos)

        const items = document.body.querySelectorAll('[data-pointer="true"]')
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                PointerCursor.pointed(true)
            })

            item.addEventListener('mouseleave', () => {
                PointerCursor.pointed(false)
            })
        })

        this.updateMousePos()
    }

    componentWillUnmount() {

        window.removeEventListener('mousemove', this.trackMousePos)
    }

    static hidePointer(){
        gsap.to('.pointer',  {
            opacity: 0,
            duration: .3
        })
    }

    static showPointer(){
        gsap.to('.pointer',  {
            opacity: 1,
            duration: .3,
        })
    }

    static pointed(pointed){
        gsap.to('.inner-pointer', {
            scale: pointed ? 1.85 : 1,
            opacity: pointed ? .5 : 1,
            duration: .6,
        })

        gsap.to('.outer-pointer', {
            scale: pointed ? .57 : 1,
            opacity: pointed ? .6 : 1,
            duration: .7
        })
    }

    render() {
        return (
            <motion.div>
                <MouseContainer ref={this.pointerRef} className='pointer'>
                    <motion.div style={{x: this.lastX, y: this.lastY}}>
                        <Outer className='outer-pointer' />
                    </motion.div>

                    <motion.div style={{x: PointerCursor.x, y: PointerCursor.y,}}>
                        <Inner className='inner-pointer'/>
                    </motion.div>
                </MouseContainer>

            </motion.div>
        );
    }
}

export default PointerCursor;