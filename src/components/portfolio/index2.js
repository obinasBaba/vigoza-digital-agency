// // noinspection CssUnknownTarget
//
// import React, {useContext, useEffect, useRef} from 'react';
// import styled, {css} from "styled-components";
// import {gridColWidth, spacing, text} from "../../styles/mixins";
// import HeadLine from "../HeadLine";
// import {AppStateContext} from "../../contexts/AppStateContext";
// import {debounce} from "@material-ui/core";
// import {Column, Menu, values} from './Controller'
// import {Link, useParams} from "react-router-dom";
// import {projectData} from "../../data";
//
// const PortfolioContainer = styled.div`
//
//   --color-text: #252528;
//   --color-bg: #afb6bc;
//   --color-link: #252528;
//   --color-link-hover: #252528;
//   --color-menu-text: #252528;
//   --color-bg-move: #afb6bc;
//
//   min-height: 100vh;
//   //max-width: 100vw;
//   //background-image: url("img/portfolio_bg.jpg");
//   background-repeat: no-repeat;
//   background-size: cover;
//   background-position: center;
//   //border: thick solid red;
//
//
//   scroll-snap-align: start;
//
//   display: grid;
//   grid-template-columns: 100%;
//   grid-template-rows: 100%;
//   align-items: center;
//
//   .content,
//   .content__move {
//     width: 100%;
//     height: 100%;
//     display: grid;
//     grid-template-columns: 100%;
//     grid-template-rows: 100%;
//     align-items: center;
//     grid-area: 1 / 1 / 2 / 2;
//     justify-self: center;
//     position: relative;
//     will-change: transform;
//
//     //background-color: var(--color-text);
//
//   }
//
//   .content--first {
//     //border: thick solid yellow;
//     //position: fixed;
//     //top: 0;
//     //left: 0;
//     overflow: hidden;
//   }
//
// `
//
// const Columns = styled.div`
//   grid-area: 1 / 1 / 2 / 2;
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   top: 0;
//   left: 0;
//   display: grid;
//   grid-template-columns: repeat(4, 1fr);
//   grid-template-rows: 100%;
//   grid-gap: 1.5rem;
//   padding: 0 8vw;
//
//   //border: thick solid yellow;
//
//   .column {
//     position: relative;
//     align-self: start;
//     will-change: transform;
//   }
//
//   .column--bottom {
//     align-self: end;
//   }
//
//   .column__img {
//     width: 100%;
//     display: block;
//     opacity: .4;
//     background-size: cover;
//     background-position: 50% 50%;
//     height: 25vw;
//   }
//
//   .column__img:nth-child(odd) {
//     height: 30vw;
//   }
//
//   .column__img:not(:last-child) {
//     margin-bottom: 1.5rem;
//   }
//
// `
//
// const HeadLineStyle = css`
//   ${gridColWidth(21,)};
//
// `
//
// const NavMenu = styled.Pagination`
//   //border: thick solid blue;
//   grid-area: 1 / 1 / 2 / 2;
//   align-self: center;
//   justify-self: center;
//   width: 100vw;
//   height: 100vh;
//   padding: 15vh 0;
//
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   color: black;
//
//     ${spacing('gap', 2)};
//
//   .menu_item {
//     position: relative;
//     font-family: raisonne-bolder, serif;
//     font-weight: 600;
//     background-color: transparent;
//     border: none;
//     -webkit-text-stroke: 3px var(--color-menu-text);
//     -webkit-text-fill-color: transparent;
//     color: transparent;
//     vertical-align: bottom;
//     margin: 0;
//     padding: 0;
//
//     &:hover {
//       -webkit-text-fill-color: var(--color-menu-text);
//       color: var(--color-menu-text);
//     }
//
//     ${text(3.5)};
//
//     span{
//       display: inline-block;
//       margin: 0;
//       padding: 0;
//       vertical-align: top;
//       line-height: 100%;
//     }
//   }
// `
//
// const Portfolio = () => {
//
//
//
//     const containerRef = useRef(null);
//     const {setDotIndex, locoRef, moScroll: {y, scrollDirection, scrollPos}, }
//         = useContext(AppStateContext);
//     // const yy = useMotionValue(y)
//
//
//     useEffect(() => {
//         return;
//
//         const callback = debounce((arg) => {
//             console.log('scroll', arg)
//
//             if (!locoRef.get().current) return;
//
//             locoRef.get().current.scrollTo(`#portfolio`, {
//                 easing: [1, 0.1, 0.23, 0.96],
//             })
//
//         }, 500)
//
//         const observe = (isIntersecting) => {
//             console.log('observing....')
//             // y.clearListeners()
//             return scrollDirection.onChange(callback)
//         }
//
//         let clear;
//
//         const options = {
//             root: null,
//             rootMargin: "0px",
//             threshold: [.5],
//         };
//
//         const observer = new IntersectionObserver(entries => {
//             if (entries[0].isIntersecting) {
//                 console.log('add')
//                 // clear = observe(entries[0].isIntersecting)
//             } else {
//                 console.log('clear')
//                 // y.clearListeners()
//                 if (clear) {
//                     console.log('clearing', clear())
//                     clear = undefined;
//                 }
//             }
//
//
//         }, options);
//         observer.observe(containerRef.current);
//
//
//     }, [locoRef, scrollDirection])
//
//     useEffect(() => {
//
//         const columnsWrap = document.querySelector('.columns');
//         const columnsElems = columnsWrap.querySelectorAll('.column');
//
//         values.scroll.top = y;
//
//         Menu.getInstance(document.querySelector('.content--first menu'))
//         columnsElems.forEach(column => new Column(column))
//
//         return () => {
//             console.log('cleanup')
//             scrollPos.set('#portfolio')
//         }
//     }, [scrollPos, y])
//
//     return (
//         <PortfolioContainer ref={containerRef} data-scroll-section id='portfolio'>
//
//             {/*<HeadLine text='portfolio' styles={HeadLineStyle}/>*/}
//
//             <div className="content content--first">
//
//                 <div className="content__move">
//                     <Columns className="columns">
//                         <div className="column">
//                             <div className="column__img" style={{backgroundImage: "url(img/2.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/6.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/13.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/14.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/5.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/6.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/7.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/8.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/9.jpg)"}}/>
//                         </div>
//                         <div className="column column--bottom">
//                             <div className="column__img" style={{backgroundImage: "url(img/3.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/11.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/1.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/15.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/14.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/13.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/12.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/3.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/15.jpg)"}}/>
//                         </div>
//                         <div className="column">
//                             <div className="column__img" style={{backgroundImage: "url(img/7.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/4.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/9.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/11.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/5.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/3.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/2.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/1.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/5.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/14.jpg)"}}/>
//                         </div>
//                         <div className="column column--bottom">
//                             <div className="column__img" style={{backgroundImage: "url(img/1.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/2.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/3.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/7.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/4.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/6.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/5.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/8.jpg)"}}/>
//                             <div className="column__img" style={{backgroundImage: "url(img/10.jpg)"}}/>
//                         </div>
//                     </Columns>
//
//                     <NavMenu className="menu">
//                         {
//                             projectData.map(({title}, idx) =>
//                                 <Link to={`/project/${idx}`} >
//                                     <button className="menu_item" aria-label={title}>
//                                         {Array.from(title).map(letter =>
//                                             <span key={title} aria-hidden='true'>{letter}</span>)}
//                                     </button>
//                                 </Link>
//                             )
//                         }
//                     </NavMenu>
//
//                 </div>
//
//             </div>
//
//         </PortfolioContainer>
//     );
// };
//
// export default Portfolio;
