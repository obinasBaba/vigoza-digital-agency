import React from 'react';
import styled from "styled-components";
import {Typography} from "@material-ui/core";
import Quote from './quote.svg'

const SwiperItemContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  //overflow: hidden;


  img {
    flex: .4;
    display: block;
    max-width: 300px;
  }
`

const Say = styled.div`
  flex: .6;
  display: grid;
  place-items: center;
  width: 100%;
  color: black;
  padding: 1rem 1rem 1rem 2rem;

  background-image: linear-gradient(137.81deg,
  #e7a28f 3.52%,
  #f9d6ac 41.89%,
  #fbfefc 96.77%);
`

const QuoteIcon = styled.div`
  position: absolute;
  left: 3%;
  top: 3%;
`

const SwiperItem = ({by, url, text}) => {


    return (
        <SwiperItemContainer>

            <QuoteIcon>
                <svg fill="none" height="50" viewBox="0 0 36 30" width="56"
                     xmlns="http://www.w3.org/2000/svg">
                    <linearGradient id="a" gradientUnits="userSpaceOnUse" x1=".9" x2="37.9778" y1="3.37505"
                                    y2="9.26594">
                        <stop offset="0" stopColor="#e7a28f"/>
                        <stop offset=".411458" stopColor="#f9d6ac"/>
                        <stop offset="1" stopColor="#fbfefc"/>
                    </linearGradient>
                    <path clipRule="evenodd"
                          d="m1.31613 14.8996 7.3035-14.8996h6.94977l-2.8233 6.40981-.2206.62471c-.2464.84167-.4495 1.94153-.0641 2.5109.3412.50408.8701.86958 1.3107 1.10808 3.8212 1.4357 6.5356 5.0789 6.5356 9.3464 0 5.5229-4.546 10-10.1539 10-5.60777 0-10.1538-4.4771-10.1538-10 0-1.621.391644-3.1519 1.08683-4.506.0572-.1996.13325-.3983.2293-.5943zm23.73007 4.9035c0 3.54-1.3199 6.7764-3.5013 9.258 1.3061.6024 2.7639.939 4.3014.939 5.6079 0 10.1539-4.4771 10.1539-9.9999 0-4.1597-2.5789-7.7262-6.248-9.2334-.3517-.2022-.826-.5504-1.198-1.09993-.6025-.89015-.1323-2.83682-.0218-3.25372l2.7287-6.41290586h-6.9497l-4.3695 8.98546586c3.1217 2.59589 5.1043 6.47859 5.1043 10.81739z"
                          fill="url(#a)" fillRule="evenodd"/>
                </svg>
            </QuoteIcon>

            <img className="swiper-slide__img lazyload" data-src={url} alt=""/>

            <Say>
                <Typography variant='h5' gutterBottom>
                    {text}
                </Typography>

                <Typography align='right'>
                    {by}
                </Typography>
            </Say>

        </SwiperItemContainer>
    );
};

export default SwiperItem;
