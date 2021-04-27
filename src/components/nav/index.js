import React from 'react';
import styled from "styled-components";

const Wrapper = styled.div`
  position: fixed;
  z-index: 9999;
  left: 4%;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-flow: column;
  gap: 30px;
`;

const Dot = styled.span`
  width: 0.9375rem;
  height: 0.9375rem;
  border-radius: 50%;
  background-color: ${ props => props.theme.palette.primary.light };

`

const Pagination = () => {
    return (
        <Wrapper>
            {
                ['welcome', 'about', 'service',
                    'portfolio', 'blog', 'contact']

                    .map( i => <Dot/> )
            }
        </Wrapper>
    );
};

export default Pagination;
