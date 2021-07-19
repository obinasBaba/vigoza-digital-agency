import React from 'react';
import styled, {css} from "styled-components";
import {gridColWidth, heightWidth, mediumUp, spacing} from "../../styles/mixins";
import {Typography} from "@material-ui/core";

const FeaturedBlogContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: start;
  grid-row: 2;
  
  ${heightWidth('gap', 3)};
  ${gridColWidth(12, 36)};
  

  ${mediumUp( css`
    flex-flow: row;

    .blog_img {
      width: calc(9em + 10vw);
      height: calc(9em + 10vw);
    }

    .title_desc {
      align-self: center;
    }
  ` )};


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
    height: 3px;
    
    ${spacing('width', 5)};
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
