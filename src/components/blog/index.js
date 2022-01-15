import React, {useContext, useEffect, useRef, useState} from 'react';
import styled, {css} from "styled-components";
import {gridColWidth, gridify, heightWidth, largeUp, spacing} from "../../styles/mixins";
import HeadLine from "../HeadLine";
import FeaturedBlog from "./FeaturedBlog";
import MoreArticles from "./MoreArticles";
import {AppStateContext} from "../../contexts/AppStateContext";
import {useIntersection} from "react-use";

const BlogsContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-content: center;
  //align-items: center;
  grid-row-gap: calc(2.8rem * var(--size));

    ${({inView}) => inView && css`
    --p-color: #000000;
    --s-color: #000000;
  `};

  p, h1, h2, h6 {
    --p-color: #000000;
    --s-color: #000000;
    
    transition: color 3s cubic-bezier(0.6, 0.01, 0, 0.9);
    color: var(--p-color);
  }
  
  
  ${gridify()};
  ${spacing('pt', 12)};
  ${spacing('pb', 12)};

  .blog__effect {
    position: absolute;
    font-family: var(--poppins);
    z-index: -9999;
    color: rgba(211, 211, 211, 0.13);

    &.b {
      font-size: 30em;
      top: -14%;
      right: -1%;
    }

    &.blog {
      font-size: 16em;
      line-height: 0;
      letter-spacing: 25px;
      right: -2%;
      top: 0;
      font-family: var(--raisonne-br);
      font-weight: bolder;
    }
  }

`

const BLogs = () => {

    const containerRef = useRef(null);
    const [inView, setInView] = useState(false);
    const {setDotIndex} = useContext(AppStateContext);

    const intersection = useIntersection(containerRef, {
        root: null,
        rootMargin: `0px 0px 0px 0px`,
        threshold: .6,
    })

    useEffect(() => {
        if(intersection && intersection.isIntersecting) {
            setInView(true)
            setDotIndex(4)
        }


    }, [intersection])

    return (
        <BlogsContainer ref={containerRef}
                        inView={inView}
                        data-scroll-call="blog"
                        data-scroll-id='blog'

                        data-scroll
                        data-scroll-repeat={true}
                        id='blog'>

            <HeadLine text='Recent Blogs'/>
            <h1 className="blog__effect blog">Blog</h1>
            <h1 className="blog__effect b">B </h1>

            <FeaturedBlog />

            <MoreArticles />

        </BlogsContainer>
    );
};

export default BLogs;
