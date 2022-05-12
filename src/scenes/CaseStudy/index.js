import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {projectData} from '../../data'
import styled from "styled-components";
import BackArrow from "../../components/BackArrow";
import {motion} from "framer-motion";
import {AppStateContext} from "../../contexts/AppStateContext";
import useDiagonalShowData from "../../components/portfolio/diagonal/useDiagonalShowData";
import { debounce, Typography } from "@material-ui/core";
import { useUI } from "../../contexts/UIStateContext";


let winsize;
const size = {height: 0, width: 0};
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize()

const CaseStudyContainer = styled( motion.div )`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 100%;
  align-items: center;
  grid-area: 1 / 1 / 2 / 2;
  justify-self: center;
  position: relative;
  min-height: 100vh;


  .item {
    grid-area: 1 / 1 / 2 / 2;
    
  }

  .item_img_wrapper {
    height: 300px;
    width: 100%;
    flex: none;
    
    //opacity: 0.4;

    //background-color: lightgray;
  }

  .item__content {
    padding: 2rem;
    height: calc(100vh - 300px);
    overflow: auto;

    .item__content-title {
      font-size: 2.5rem;
      margin: 0;
      line-height: 1.2;
      pointer-events: none;
    }

    .item__content-title span {
      display: inline-block;
      white-space: pre;
      pointer-events: none;
      will-change: transform;
    }

    .item__content-subtitle {
      font-weight: normal;
      margin: 0;
      font-size: 1.5rem;
    }

    .item__content-text {
      margin: 10vh 0 4rem 0;
      position: relative;
      line-height: 1.5;
      
      &::after{
        content: '';
        width: 2rem;
        height: 2px;
        position: absolute;
        background: currentColor;
        top: calc(100% + 3rem);
      }
    }

  }

  
  @media screen and (min-width: 53em) {
    
    .item {
      position: relative;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
    }

    .deco{
      position: absolute;
      background: var(--accent400);
      top: 10%;
      height: 80%;
      width: 27%;
      margin: -20px -40px 0 0;
      border-radius: 10px;
    }

    .item_img_wrapper {
      position: absolute;
      top: 10%;
      height: 80%;
      width: 27%;
      border-radius: 10px;

      //height: 100%;
      //width: 45%;
      //left: 0;
      
      background-position: 50% 50%;
      
      .item_img{
        //position: absolute;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-position: 50% 50%;
        border-radius: 10px;

        //transform: translateX(calc( -1 * (100vw / 2 - 50%) ));
      }
    }

    .item__content {
      position: absolute;
      left: 45%;
      padding: 15vh 12vw 0 8vw;
      height: calc(100% - 12rem);
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      overflow: visible;
      z-index: 999;


      .back-arrow{
        z-index: 999;
      }

      .item__content-title {
        font-size: 5vw;
      }

      .item__content-subtitle {
        font-size: 2vw;
      }

      .item__content-text {
        margin-bottom: 0;
      }
    }
  }

  & *{
    pointer-events: auto;
  }
`



const transition = {
    // delay:  0,
    duration: .8,
    ease: [0.83, 0, 0.17, 1],
}

const containerVariant = {

}

const imgContainerVariant = {
    animate(){
        // return;
        if (size.width === 0) return;
        const {width, height} = size;

        return {
            originX: 0,
            originY: .5,
            scale: ( ((winsize.width / width) * .45 ) / (winsize.height / (height * 1.2))),
            x:  -1*(winsize.width/2 - width / 2 ),
        }
    },

    initial() {
        // const {width, height} = Window.nodeSize;
        return {
            originX: 0,
            originY: .5,
            // scale: ( ((winsize.width / width) * .45 ) / (winsize.height / (height * 1.2))),
            // x:  -1*(winsize.width/2 - width / 2 ),
        }
    },

    exit: {
        originX: 0,
        originY: .5,
        scale: 1,
        x: 0,
    }
}

const decoVariants = {
    initial: {

    },
    animate: {
        height: '100%',
        top: 0,
        width: '100%',
        margin: 0,

    },
    exit: {
        height: '80%',
        top: '10%',
        width: '27%',
        margin: '-20px -40px 0 0',
        // x: 20,
        // y: -20,
        // scaleX: 1,
        // scaleY: 1,
    }
}

const textVariants = {
    initial: {
        opacity: 0
    },

    animate: {
        opacity: 1,
        transition: {
            ...transition,
            delay: .5
        }
    },
    exit: {
        opacity: 0
    }
}

const CaseStudy = () => {

    const { transDetail } = useContext(AppStateContext);
    const {activeIdx} = transDetail.get();

    const {toggleIt, state} = useUI();

    const data = useDiagonalShowData()
    const [project, setProject] = useState({
        title: '', intro: '', content: '', imgSrc: ''
    });

    useLayoutEffect(() => {

        /*document.body.querySelector('main#main-container')
            .style.transform = 'initial';*/

        function onResize() {
            const slideWrapper = document.body.querySelector(`.item_img`);
            ([size.height, size.width] = [slideWrapper.offsetHeight, slideWrapper.offsetWidth])
        }

        onResize();

        const onResizeDebounced = debounce(onResize, 1)

        window.addEventListener('resize', onResizeDebounced)
        return () => window.removeEventListener('resize', onResizeDebounced)

    }, [])


    useEffect(() => {
        /*
                document.body.querySelector('main#main-container')
                    .style.transform = 'initial';*/

        transDetail.set({
            ...transDetail.get(),
            fromCaseStudy: true
        })

        if (projectData.length < activeIdx) return;
        setProject({...projectData[activeIdx], imgSrc: data[Number(activeIdx)].img  })

    }, []);

    return (
        <CaseStudyContainer className="content content--second"
                            id='case-study-container'
                            variants={containerVariant}
                            initial='initial'
                            animate='animate'
                            exit='exit'
        >


            <article className="item">

                <motion.div className='deco'
                            variants={decoVariants}
                            transition={transition}
                    // layoutId={'deco'}

                />


                <motion.div className="item_img_wrapper"
                            variants={imgContainerVariant}
                    // initial={false}
                            transition={transition}

                >
                    <motion.div className="item_img"
                                style={{backgroundImage: `url(/${project.imgSrc})`}}
                        // variants={imgContainerVariant}
                        // transition={transition}

                    >

                        {/*<motion.img className="item_img"
                                    variants={imgContainerVariant}
                                    transition={transition}
                                    src={`/img/${project.imgSrc}`}/>*/}

                    </motion.div>

                </motion.div>


                <motion.div className="item__content"
                            variants={textVariants}

                >

                    <div onClick={() => {

                        toggleIt()

                    }} className='back-arrow'>
                        <BackArrow/>

                    </div>

                    <h2 className="item__content-title">{project.title}</h2>
                    <h3 className="item__content-subtitle">{project.intro}</h3>
                    <div className="item__content-text">
                        {project.content}
                    </div>
                </motion.div>


            </article>

        </CaseStudyContainer>
    );
};

export default CaseStudy;
