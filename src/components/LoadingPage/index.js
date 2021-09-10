import React, {useEffect, useRef} from 'react';
import styled from "styled-components";
import gsap from "gsap";
import {useRaf} from "react-use";

const lineLength = 100;
let p0cX = 0;
let p0cY = 0;
let p1cX = 0;
let p1cY = 0;

const LoadingContainer = styled.div`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 20;
  background-color: navajowhite;
  background-image: url("img/city.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &::after {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: block;
    background-color: black;
    opacity: .85;
  }


  div {

    position: absolute;
    //height: 10px;
    //width: 10px;
    //background-color: orange;
    //color: black;
  }

  svg {
    z-index: 2;
    //position: absolute;
    //top: 50%;
    //left: 0;

    #c0, #c1 {
      position: absolute;
    }
  }
`

const LoadingPage = () => {
    const middleRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);
    const circleRef0 = useRef(null);
    const circleRef1 = useRef(null);
    const pathRef = useRef(null);
    const svgRef = useRef(null);

    useEffect(() => {
        gsap.ticker.remove(updateLine)
        gsap.killTweensOf()

        gsap.timeline()
            .set(svgRef.current, {
                position: 'absolute',
                top: '50%',
                left: 0,
                xPercent: 0,
                yPercent: -50
            })
            .set(middleRef.current, {
                x: 300,
                y: 300,
            })
            .set(leftRef.current, {
                x: 10,
                y: 100,
            })
            .set(rightRef.current, {
                x: 100,
                y: 100,
            })

        const timeline = gsap.timeline({
            repeat: -1,
            yoyo: true,
            repeatDelay: 1,
        }).timeScale(2);


        timeline.to(leftRef.current, {
            x: 200,
            ease: 'power4.inOut',
            onUpdate: () => updateCircle(0),
            duration: 1,
        }).to(rightRef.current, {
            x: 300,
            onUpdate: () => updateCircle(),
            ease: 'power4.inOut',
            duration: 1,
        }).to(leftRef.current, {
            x: 400,
            onUpdate: () => updateCircle(0),
            ease: 'power4.inOut',
            duration: 1,
        }).to(rightRef.current, {
            x: 500,
            onUpdate: () => updateCircle(),
            ease: 'power4.inOut',
            duration: 1,
        });


        gsap.ticker.add(updateLine);

        initPoints();

    })


    const updateLine = () => {
        const leftX = gsap.getProperty(leftRef.current, 'x')
        const leftY = gsap.getProperty(leftRef.current, 'y')
        const rightX = gsap.getProperty(rightRef.current, 'x')
        const rightY = gsap.getProperty(rightRef.current, 'y')

        const bezierDiffX = Math.abs(leftX - rightX) / 2;
        const bezierOffsetX = Math.min(leftX, rightX) + bezierDiffX;
        const bezierOffsetY = Math.min(leftY, rightY) - (lineLength);

        gsap.to(middleRef.current, {
            duration: 0.08,
            x: bezierOffsetX,
            y: bezierOffsetY,
            ease: 'power1.in'
        })

        let nullX = gsap.getProperty(middleRef.current, 'x');
        let nullY = gsap.getProperty(middleRef.current, 'y');

        gsap.set(pathRef.current, {
            attr: {
                d: "M" + p0cX + "," + p0cY + " Q" + nullX + "," + nullY + " " + p1cX + "," + p1cY
            }
        })
    }

    const updateCircle = (no) => {
        const leftX = gsap.getProperty(leftRef.current, 'x')
        const leftY = gsap.getProperty(leftRef.current, 'y')
        const rightX = gsap.getProperty(rightRef.current, 'x')
        const rightY = gsap.getProperty(rightRef.current, 'y')

        gsap.set(circleRef0.current, {
            attr: {
                cx: no === 0 ? leftX : rightX,
                cy: no === 0 ? leftY : rightX,
            }
        })
        p0cX = leftX;
        p0cY = leftY;
        p1cX = rightX;
        p1cY = rightY;
    }

    function initPoints() {
        gsap.set(circleRef0.current, {
            attr: {
                cx: gsap.getProperty(leftRef.current, 'x'),
                cy: gsap.getProperty(leftRef.current, 'y')
            }
        })
        gsap.set(circleRef1.current, {
            attr: {
                cx: gsap.getProperty(rightRef.current, 'x'),
                cy: gsap.getProperty(rightRef.current, 'y')
            }
        })
        updateCircle(0);
        updateCircle();
        updateLine();
    }

    return (
        <LoadingContainer>
            <svg ref={svgRef} id="line-svg-node" width="100%" height="120px" viewBox="0 0 600 120">
                <path ref={pathRef} id="path" fill="none" stroke="rgba(255, 69, 0, 0.74)" strokeWidth="8" strokeLinecap="round"
                      strokeLinejoin="round" strokeMiterlimit="10" d="
				M400,200 Q500,200 600,200 "/>
                <circle ref={circleRef0} id="c0" cx="0" cy="0" r="14" fill="rgba(0, 0, 0, 0)" strokeWidth="0" stroke="red"/>
                <circle ref={circleRef1} id="c1" cx="0" cy="0" r="14" fill="rgba(0, 0, 0, 0)" strokeWidth="0" stroke="red"/>
            </svg>
            <div ref={middleRef} className="middle"/>
            <div ref={leftRef} className="left"/>
            <div ref={rightRef} className="right"/>
        </LoadingContainer>
    );
};

export default LoadingPage;
