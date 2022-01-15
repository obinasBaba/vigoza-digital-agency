import {createGlobalStyle, css} from "styled-components";
import {responsiveVar} from "../styles/commons";
import {smallUp} from "../styles/mixins";
import '../styles/fontFace.css';


export const GlobalStyles = createGlobalStyle`

  ${ responsiveVar };
  
  body{

    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    //color: white;
    
    * {
      ${smallUp( css`
        //cursor: none;
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

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  .bars{
    fill: url(#pattern-602e0271028d1);
  }

  .bars.mobile{
    z-index: -999;
  }

  .bars.mobile  image{
    transform: translateX(23%);
  }
  
  a{
    text-decoration: none;
    display: inline-block;
    color: inherit;
    margin: 0;
    padding: 0;
  }
`