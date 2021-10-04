import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {projectData} from '../data'
import styled from "styled-components";
import BackArrow from "../components/BackArrow";

const CaseStudyContainer = styled.div`
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

  .item__img {
    height: 300px;
    width: 100%;
    flex: none;
    background-size: cover;
    background-position: 50% 25%;
    opacity: 0.4;

    border: thin solid greenyellow;
    background-color: lightgray;
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
      height: 100%;
      width: 100%;
      display: flex;
    }

    .item__img {
      height: 100%;
      width: 45%;
      background-position: 50% 50%;
    }

    .item__content {
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


const CaseStudy = () => {

    const {id} = useParams()

    const [project, setProject] = useState({
        title: '', intro: '', content: '', imgSrc: ''
    });

    useEffect(() => {

        console.log('project:', id)

        if (projectData.length < id) return;
        setProject(projectData[id])


        return () => {
        };
    }, [id]);


    return (
        <CaseStudyContainer className="content content--second">

            <article className="item">
                <div className="item__img" style={{backgroundImage: `url(/img/${project.imgSrc})`}}/>
                <div className="item__content">

                    <BackArrow/>
                    <h2 className="item__content-title">{project.title}</h2>
                    <h3 className="item__content-subtitle">{project.intro}</h3>
                    <div className="item__content-text">
                        {project.content}
                    </div>
                </div>
            </article>

        </CaseStudyContainer>
    );
};

export default CaseStudy;
