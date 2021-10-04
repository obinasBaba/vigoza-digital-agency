import React from 'react';
import styled from "styled-components";
import {heightWidth} from "../../styles/mixins";
import {Typography} from "@material-ui/core";
import {Link} from "@material-ui/icons";

const ProjectItemsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-flow: wrap;
  border: thin solid red;
  gap: 1rem;
  
  
  img{
    max-width: 200px;
    object-fit: cover;
  }
  
  & > :first-child{
    align-self: center;
  }

  & > :last-child{
    align-self: flex-end;
  }

`

const MiddleImg = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  max-width: 200px;
  
  border: thin solid blue;
  
  ${heightWidth('gap', 1.5)};
  
  .icon{
    transform: rotate(20deg);
    height: 50px;
    width: 50px;
    background: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`



const ProjectItems = () => {
    return (
        <ProjectItemsContainer>

            <img src="img/typing-70.jpg" alt="project image"/>

            <MiddleImg>
                <img src="img/cat-80.jpg" alt="cat"/>
                <Typography variant='body1'>Coffee Cup</Typography>
                <Typography className='desc' variant='subtitle2' color='textSecondary'>Lorem ipsum dolor sit amet,
                    consectetur adipisicing elit. Fuga, nam!
                </Typography>

                <div className="icon">
                    <Link color='secondary'  />
                </div>
            </MiddleImg>

            <img src="img/long.png" alt="project image"/>

        </ProjectItemsContainer>
    );
};

export default ProjectItems;
