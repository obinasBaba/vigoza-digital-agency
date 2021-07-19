import React from 'react';
import styled, {css} from "styled-components";
import {gridColWidth, heightWidth, largeUp, mediumUp} from "../../styles/mixins";
import {Typography} from "@material-ui/core";

const MoreArticlesContainer = styled.aside`
  display: flex;
  flex-flow: column;
  gap: 20px;
  grid-row: 3;
  align-self: center;
  justify-self: center;
  
  ${heightWidth('gap', 3)};
  ${gridColWidth(20, 40)};
  
  ${mediumUp(css`
    grid-row: 2;
    ${gridColWidth(40, 57)};
  `)};

`

const BlogItem = styled.div`
  cursor: pointer;

  p {
    font-size: 1em;
  }
  
  & > :first-child{
    font-weight: bold;
  }

  &:nth-child(n + 2)::before {
    content: '';
    display: block;
    width: 100%;
    height: 1.5px;
    margin-bottom: 10%;
    background: rgba(128, 128, 128, 0.31);
  }
`

const MoreArticles = () => {
    return (
        <MoreArticlesContainer className="more_articles">

            <BlogItem className="other__blogs">
                <Typography>QUAM SIT RIDICULUS</Typography>
                <Typography variant='subtitle2' color='textSecondary'>
                    Industrial Design / Yesterday / by John Doe
                </Typography>

            </BlogItem>

            <BlogItem className="other__blogs">
                <Typography>LIGULA MATTIS TELLUS</Typography>
                <Typography variant='subtitle2' color='textSecondary'>
                    Photography / June, 18, 2016 / by Michael Doe</Typography>
            </BlogItem>

            <BlogItem className="other__blogs">
                <Typography>LIGULA MATTIS TELLUS</Typography>
                <Typography variant='subtitle2' color='textSecondary'>
                    Photography / June, 18, 2016 / by Michael Doe</Typography>
            </BlogItem>

        </MoreArticlesContainer>

    );
};

export default MoreArticles;
