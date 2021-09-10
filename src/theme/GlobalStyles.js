import {createGlobalStyle, css} from "styled-components";
import {responsiveVar} from "../styles/commons";
import {smallUp} from "../styles/mixins";

export const GlobalStyles = createGlobalStyle`

  ${ responsiveVar }  ;
  
  body{
    
    * {
      ${smallUp( css`
      cursor: none;
    ` )};
    }
    
  }
  
  * {
    scrollbar-width: none;
    scrollbar-color: #3719ca #1e213d;
  }

  /* Works on Chrome, Edge, and Safari */
  *::-webkit-scrollbar {
    width: 0;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #3719ca;
    border-radius: 100px;
    transition: background-color 1s ease-in-out;
  }
  
  
`