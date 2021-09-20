// noinspection HtmlUnknownTarget,CssUnknownTarget

import React, {useEffect} from 'react';
import styled, {keyframes} from "styled-components";
import {PointerCursor} from "../CustomMouse";

const marquee = keyframes`
  0% {
    transform: translate3d(var(--move-initial), 0, 0);
  }

  100% {
    transform: translate3d(var(--move-final), 0, 0);
  }
`

const NavMenuContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(255, 222, 173);
  pointer-events: initial;

  &::before {
    animation: grain 8s steps(10) infinite;
    background-image: url(../img/noise.png);
    content: '';
    height: 300%;
    left: -50%;
    opacity: 0.6;
    position: fixed;
    top: -100%;
    width: 300%;
  }

  @keyframes grain {
    0%, 100% {
      transform: translate(0, 0);
    }
    10% {
      transform: translate(-5%, -10%);
    }
    20% {
      transform: translate(-15%, 5%);
    }
    30% {
      transform: translate(7%, -25%);
    }
    40% {
      transform: translate(-5%, 25%);
    }
    50% {
      transform: translate(-15%, 10%);
    }
    60% {
      transform: translate(15%, 0%);
    }
    70% {
      transform: translate(0%, 15%);
    }
    80% {
      transform: translate(3%, 35%);
    }
    90% {
      transform: translate(-10%, 10%);
    }
  }
`

const Menu = styled.nav`
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 10vh 0 25vh;
  counter-reset: menu;

  --marquee-width: 100vw;
  --offset: 20vw;
  --move-initial: calc(-25% + var(--offset));
  --move-final: calc(-50% + var(--offset));
  --item-font-size: 6.5vw;
`

const MenuItem = styled.div`
  position: relative;
  padding: 1vh 6vw 0;

  .menu__item-img {
    position: absolute;
    left: 100%;
    top: 50%;
    pointer-events: none;
    //max-width: 280px;
    transform: translate3d(calc(-100% - 6vw), -30%, 0) translate3d(0, 20px, 0);
    height: 50vh;
    max-height: 400px;

    opacity: 0;
  }

  .menu__item-link,
  .marquee span {
    white-space: nowrap;
    font-size: var(--item-font-size);
    padding: 0 1vw;
    //font-family: raisonne-bold;
    font-weight: bolder;
    line-height: 1.15;
  }
`

const MenuItemLink = styled.a`
  position: relative;
  -webkit-text-stroke: 1.5px #000;
  -webkit-text-fill-color: transparent;
  color: transparent;
  transition: opacity 0.4s;
  line-height: 100%;
  //border: thin solid yellow;
  //opacity: 0;

  &::before {
    all: initial;
    content: counter(menu);
    font-family: inherit;
    counter-increment: menu;
    position: absolute;
    bottom: 60%;
    left: -4%;
    pointer-events: none;
  }

  &:hover {
    transition-duration: 0.1s;
    opacity: 0;
  }

  &:hover + .menu__item-img {
    opacity: 1;
    transform: translate3d(calc(-100% - 6vw), -30%, 0) rotate3d(0, 0, 1, 6deg);
    transition: all 0.4s;
  }

  &:hover ~ .marquee .marquee__inner {
    animation-play-state: running;
    opacity: 1;
    transition-duration: 0.4s;
  }

`

const Track = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: var(--marquee-width);
  overflow: hidden;
  pointer-events: none;
  //mix-blend-mode: color-burn;

  //border: thin solid green;

  span {
    text-align: center;
    font-style: italic;
    font-family: raisonne-bold,serif;
  }

  .marquee__inner {
    position: relative;
    display: flex;
    gap: 2rem;
    width: fit-content;
    transform: translate3d(var(--move-initial), 0, 0);
    animation: marquee 5s linear infinite;
    animation-play-state: paused;
    opacity: 0;
    transition: opacity 0.1s;

    border: thin solid black;

    @keyframes marquee {
      0% {
        transform: translate3d(var(--move-initial), 0, 0);
      }

      100% {
        transform: translate3d(var(--move-final), 0, 0);
      }
    }
  }
`


const NavMenu = () => {

    useEffect(() => {
        const disableScroll = ev => ev.preventDefault()

        window.addEventListener('scroll', disableScroll)

        return () => window.removeEventListener('scroll', disableScroll)
    })

    useEffect(() => {
        const items = document.body.querySelectorAll('.menu__item .menu__item-link')
            items.forEach(item => {
                item.addEventListener('mouseenter', () => {
                    PointerCursor.pointed(true)
                })

                item.addEventListener('mouseleave', () => {
                    PointerCursor.pointed(false)
                })
            })


        return () => {};
    }, []);
    

    return (
        <NavMenuContainer>
            <Menu className="menu">
                <MenuItem className="menu__item" data-pointer={true} >
                    <MenuItemLink href='#' className="menu__item-link">Showreel</MenuItemLink>
                    <img className="menu__item-img" src="img/1.jpg" alt="Sasfasdfasd ome "/>
                    <Track className="marquee">
                        <div className="marquee__inner" aria-hidden="true">
                            <span>Showreel</span>
                            <span>Showreel</span>
                            <span>Showreel</span>
                            <span>Showreel</span>
                        </div>
                    </Track>
                </MenuItem>
                <MenuItem className="menu__item" data-pointer={true}>
                    <MenuItemLink href='#' className="menu__item-link">Case Studies</MenuItemLink>
                    <img className="menu__item-img" src="img/2.jpg" alt="Soasdf asdfme "/>
                    <Track className="marquee">
                        <div className="marquee__inner" aria-hidden="true">
                            <span>Case Studies</span>
                            <span>Case Studies</span>
                            <span>Case Studies</span>
                            <span>Case Studies</span>
                        </div>
                    </Track>
                </MenuItem>
                <MenuItem className="menu__item" data-pointer={true}>
                    <MenuItemLink href='#' className="menu__item-link">Experiments</MenuItemLink>
                    <img className="menu__item-img" src="img/3.jpg" alt="Some asdfas df"/>
                    <Track className="marquee">
                        <div className="marquee__inner" aria-hidden="true">
                            <span>Experiments</span>
                            <span>Experiments</span>
                            <span>Experiments</span>
                            <span>Experiments</span>
                        </div>
                    </Track>
                </MenuItem>
                <MenuItem className="menu__item" data-pointer={true}>
                    <MenuItemLink href='#' className="menu__item-link">Our Crew</MenuItemLink>
                    <img className="menu__item-img" src="img/4.jpg" alt="Somasdf asdfe "/>
                    <Track className="marquee">
                        <div className="marquee__inner" aria-hidden="true">
                            <span>The Crew</span>
                            <span>The Crew</span>
                            <span>The Crew</span>
                            <span>The Crew</span>
                        </div>
                    </Track>
                </MenuItem>
                <MenuItem className="menu__item" data-pointer={true}>
                    <MenuItemLink href='#' className="menu__item-link">Contact</MenuItemLink>
                    <img className="menu__item-img" src="img/5.jpg" alt="Some "/>
                    <Track className="marquee">
                        <div className="marquee__inner" aria-hidden="true">
                            <span>Contact</span>
                            <span>Contact</span>
                            <span>Contact</span>
                            <span>Contact</span>
                        </div>
                    </Track>
                </MenuItem>
            </Menu>
        </NavMenuContainer>
    );
};

export default NavMenu;
