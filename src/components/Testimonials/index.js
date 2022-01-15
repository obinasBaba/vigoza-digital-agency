import React, {useEffect} from 'react';
import {SwiperContainer, TestimonialGrid, TestimonialsContainer} from "./components";
import 'lazysizes';
import Swiper from 'swiper';
import Cursor from "../Fixed/CustomMouse/PointerCursor";
import {ArrowCursor} from "../Fixed/CustomMouse";
import 'swiper/swiper-bundle.css'
import SwiperItem from "./SwiperItem";

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
