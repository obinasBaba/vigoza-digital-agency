import React, {useContext, useEffect, useLayoutEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {projectData} from '../data'
import styled from "styled-components";
import BackArrow from "../components/BackArrow";
import {motion} from "framer-motion";
import {AppStateContext} from "../contexts/AppStateContext";
import useDiagonalShowData from "../components/portfolio/diagonal/useDiagonalShowData";
import {debounce} from "@material-ui/core";


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
  }

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
  }

  .item__content-text::after {
    content: '';
    width: 2rem;
    height: 2px;
    position: absolute;
    background: currentColor;
    top: calc(100% + 3rem);
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
      //top: 10%;
      height: 100%;
      width: 100%;
      //margin: -40px 0 0 0;
      //right: -20px;
    }

    .item_img_wrapper {
      position: absolute;
      top: 10%;
      height: 80%;
      width: 27%;
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


`



const transition = {
    duration:  0,
    // delay:  0,
    // ease: [0.83, 0, 0.17, 1],
}

const containerVariant = {

}

const imgContainerVariant = {
    animate(){
        if (size.width === 0) return;
        console.log('size: animate ', size)

        const {width, height} = size;

        return {
            originX: 0,
            originY: .5,
            scale: ( ((winsize.width / width) * .45 ) / (winsize.height / (height * 1.2))),
            x:  -1*(winsize.width/2 - width / 2 ),
        }


    },

    initial() {
        console.log('size: ', Window.nodeSize)
        const {width, height} = Window.nodeSize;
        return {
            originX: 0,
            originY: .5,
            scale: ( ((winsize.width / width) * .45 ) / (winsize.height / (height * 1.2))),
            // x:  -1*(winsize.width/2 - width / 2 ),
        }
    },

    exit: {
        // scale: 1,
        // x: 0,
    }
}

const decoVariants = {
    initial: {
        // x: 20,
        // y: -20,
        // x: 0,
        // y: 0,
        // scaleX: winsize.width / 518.391,
        // scaleY: winsize.height / 756.797,
    },
    animate: {
        // x: 0,
        // y: 0,
        // scaleX: winsize.width / 518.391,
        // scaleY: winsize.height / 756.797,

    },
    exit: {
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
        opacity: 1
    },
    exit: {
        opacity: 0
    }
}

const CaseStudy = () => {

    const { transDetail } = useContext(AppStateContext);

    const { id } = useParams()

    const data = useDiagonalShowData()
    const [project, setProject] = useState({
        title: '', intro: '', content: '', imgSrc: ''
    });

    useLayoutEffect(() => {

        document.body.querySelector('main#main-container')
            .style.transform = 'initial';

        console.log('a;klsdjf')

        function onResize() {
            const slideWrapper = document.body.querySelector(`.item_img`);
            ([size.height, size.width] = [slideWrapper.offsetHeight, slideWrapper.offsetWidth])
        }

        onResize();
        console.log('onResize size: ', size)

        const onResizeDebounced = debounce(onResize, 1)

        window.addEventListener('resize', onResizeDebounced)
        return () => window.removeEventListener('resize', onResizeDebounced)

    }, [])


    useEffect(() => {
        transDetail.set({
            ...transDetail.get(),
            fromCaseStudy: true,
        })

        if (projectData.length < id) return;
        setProject({...projectData[id], imgSrc: data[Number(id)].img  })

    }, [id]);

    return (
        <CaseStudyContainer className="content content--second"
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
                            // layoutId={'img'}
                            variants={imgContainerVariant}
                            initial={false}
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

                    <BackArrow/>
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
