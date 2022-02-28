import React, {useEffect} from 'react';
import {SwiperContainer, TestimonialGrid, TestimonialsContainer} from "./components";
import 'lazysizes';
import Swiper from 'swiper';
import Cursor from "../Fixed/CustomMouse/PointerCursor";
import {ArrowCursor} from "../Fixed/CustomMouse";
import 'swiper/swiper-bundle.css'
import SwiperItem from "./SwiperItem";
import styled from "styled-components";
import {spacing, text} from "../../styles/mixins";

const TestimonialsEffect = styled.h1`
  position: absolute;
  top: -20%;
  right: -21%;
  line-height: 0;
  font-family: var(--raisonne-br);
  color: var(--accent300);
  opacity: .2;
  font-weight: bolder;
  
  filter: blur(3px);
  
  ${text( 11 )};
  ${spacing( 'letter-spacing', -.5 )};
`

const QuoteIcon = styled.div`
  position: absolute;
  //width: 5rem;
  right: 4%;
  top: -30%;
  z-index: -1;
`

const Testimonials = () => {

    const data = [
        {
            url: 'img/500.jpeg',
            say: 'They perfectly met my expectations -- working with the felt like an extension of my in-house team.',
            by: 'hana, CEO, honey'
        }, {
            url: 'img/cat-80.jpg',
            say: 'The value we get from the mand their quality work set the apart from the others',
            by: 'Marshall hass, CEO & and co-founder, need/want',
        }, {
            url: 'img/comp-30.jpg',
            say: 'Vigoza was transparent about deliverables and any challenges the team was facing',
            by: 'Anton, Founder, Glance Tech inc.',
        }, {
            url: 'img/long.png',
            say: 'I was most appreciative of their ability to provide us with designers for specific needs',
            by: 'Bogdan, Founder, Liban',
        }, {
            url: 'img/pinkpc-50.jpg',
            say: 'Vigoza works hard to produce good result as a reasonable price',
            by: 'messay, Co-founder, software company',
        }
    ]

    useEffect(() => {

        const swiperContainer = document.querySelector(".swiper-container");
        const swiperButtonPrev = document.querySelector(".swiper-button-prev");
        const swiperButtonNext = document.querySelector(".swiper-button-next");

        const swiper = new Swiper('.swiper-container', {
            slidesPerView: 2,
            loop: true,
            spaceBetween: 100,
            centeredSlides: true,
            freeMode: true,
            lazy: false,
            // rewind: true,

            navigation: {
                nextEl: swiperButtonNext,
                prevEl: swiperButtonPrev
            }
        });


        swiper.on('touchMove', e => {
            ArrowCursor.onTouchMove(e)
        })

        swiper.on('slideChange', () => {
            ArrowCursor.bump()

        })

        swiperButtonPrev.addEventListener('click', () => {
            swiper.slideNext()
        })

        swiperButtonNext.addEventListener('click', () => {
            swiper.slidePrev()
        })

        swiperButtonPrev.addEventListener("mouseenter", evt => {
            ArrowCursor.onSwitchSwiperSides('right')
        });
        swiperButtonNext.addEventListener("mouseenter", evt => {
            ArrowCursor.onSwitchSwiperSides('left')
        });


        swiperContainer.addEventListener("mouseenter", e => {
            Cursor.hidePointer()
            ArrowCursor.onSwiperMouseEnter(e)

            console.log('mouseenter swiperCOntainer')
        });

        swiperContainer.addEventListener("mouseleave", e => {
            Cursor.showPointer()
            ArrowCursor.onSwiperMouseLeave(e)
        });

    })

    return (
        <TestimonialsContainer data-scroll
                               data-scroll-call="testimonials"
                               data-scroll-repeat={true}
                               id='testimonials'
        >

            <TestimonialsEffect>
                Testimonials
            </TestimonialsEffect>

            <QuoteIcon>
                <svg fill="none" height="100%" viewBox="0 0 36 30" width="100%"
                     xmlns="http://www.w3.org/2000/svg">
                    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1=".9" x2="37.9778" y1="3.37505"
                                    y2="9.26594">
                        <stop offset=".1" stopColor="#e7a28f"/>
                        <stop offset=".611458" stopColor="#f9d6ac"/>
                        <stop offset="1" stopColor="#fbfefc"/>
                    </linearGradient>
                    <path clipRule="evenodd"
                          d="m1.31613 14.8996 7.3035-14.8996h6.94977l-2.8233 6.40981-.2206.62471c-.2464.84167-.4495 1.94153-.0641 2.5109.3412.50408.8701.86958 1.3107 1.10808 3.8212 1.4357 6.5356 5.0789 6.5356 9.3464 0 5.5229-4.546 10-10.1539 10-5.60777 0-10.1538-4.4771-10.1538-10 0-1.621.391644-3.1519 1.08683-4.506.0572-.1996.13325-.3983.2293-.5943zm23.73007 4.9035c0 3.54-1.3199 6.7764-3.5013 9.258 1.3061.6024 2.7639.939 4.3014.939 5.6079 0 10.1539-4.4771 10.1539-9.9999 0-4.1597-2.5789-7.7262-6.248-9.2334-.3517-.2022-.826-.5504-1.198-1.09993-.6025-.89015-.1323-2.83682-.0218-3.25372l2.7287-6.41290586h-6.9497l-4.3695 8.98546586c3.1217 2.59589 5.1043 6.47859 5.1043 10.81739z"
                          fill="url(#a)" fillRule="evenodd"/>
                </svg>
            </QuoteIcon>

            <TestimonialGrid className="grid"
                             data-scroll
                             data-scroll-speed='-2'
                             data-scroll-direction='horizontal'
                             data-scroll-target='#testimonials'>

                <SwiperContainer className="swiper-container">
                    <div className="swiper-wrapper">
                        {
                            data
                                .map(({url, by, say}, idx) => {
                                    return (
                                        <div className="swiper-slide" key={idx}>

                                            <SwiperItem url={url} by={by} text={say}/>

                                        </div>
                                    );
                                })
                        }

                    </div>

                    <div className="swiper-button-prev"  />

                    <div className="swiper-button-next"/>

                </SwiperContainer>
            </TestimonialGrid>
        </TestimonialsContainer>
    );
};

export default Testimonials;
