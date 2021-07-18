import React from 'react';
import styled from "styled-components";
import {gridColWidth, heightWidth, spacing} from "../../styles/mixins";
import {Typography} from "@material-ui/core";

const FeaturedBlogContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: start;
  grid-row: 2;
  
  ${heightWidth('gap', 3)};
  ${gridColWidth(12, 36)};
  

  @media (max-width: 43.5em), (min-width: 54.5em) {
    flex-flow: row;

    .blog_img {
      width: calc(9em + 10vw);
      height: calc(9em + 10vw);
    }

    .title_desc {
      align-self: center;
    }
  }


`

const IMG = styled.img`
  max-width: 80%;
  height: calc(9em + 10vw);
  object-fit: cover;
`

const TextWrapper = styled.div`
  position: relative;
  align-self: flex-end;

  & > :first-child{
    font-weight: bolder;
    
  }

  &::before {
    content: '';
    position: absolute;
    background: var(--accent400);
    display: inline-block;
    top: 10px;
    left: -35%;
    width: 55px;
    height: 3px;
  }
`

const FeaturedBlog = () => {
    return (
        <FeaturedBlogContainer>
            <IMG className="blog_img" src="img/pinkpc-50.jpg" alt=""/>

            <TextWrapper className="title_desc">
                <Typography className="blog__title">Retrofit for Network Request</Typography>

                <Typography variant='subtitle2' color='textSecondary' >
                    Android / Today / by Obinas Baba
                    </Typography>
            </TextWrapper>
        </FeaturedBlogContainer>
    );
};

export default FeaturedBlog;
