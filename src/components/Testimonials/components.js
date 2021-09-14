import styled from "styled-components";
import {spacing} from "../../styles/mixins";


export const TestimonialsContainer = styled.div`
  position: relative;
  min-height: 110vh;
  //background-color: rgba(255, 69, 0, 0.25);
  
  ${spacing('mb', 15)};
`


export const TestimonialGrid = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  
  .swiper-wrapper{
    
  }
  
  .swiper-slide{
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    opacity: 0;
    object-fit: cover;
    transition: opacity 0.3s ease;

    &.lazyloaded {
      opacity: 1;
    }
  }
`

export const SwiperContainer = styled.div`
  position: relative;
  width: 100%;
  height: 65vh;
  overflow: hidden;


  .swiper-button-prev,
  .swiper-button-next {
    position: absolute;
    z-index: 99920;
    border: thin solid teal;
    width: 50%;
    height: 100%;
    margin-top: 0;
    top: 0;
    background-image: none;
    cursor: none;
    opacity: 0;
  }

  .swiper-button-prev {
    left: 0;
  }

  .swiper-button-next {
    right: 0;
  }
`
