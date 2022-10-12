import React, {useContext, useEffect, useState} from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import Hero from "../../components/hero";
import About from "../../components/about";
import Services from "../../components/services";
import Portfolio from "../../components/portfolio/index";
import BLogs from "../../components/blog";
import Contact from "../../components/contact";
import Footer from "../../components/Footer";
import Testimonials from "../../components/Testimonials";
import useFonts from "../../hooks/useFonts";
import useLocoScroll from "../../hooks/useLocoScroll";
import {ScrollStateContext} from "../../contexts/ScrollStateContext";
import {AppStateContext} from "../../contexts/AppStateContext";

const HomePageContainer = styled(motion.main)`
  //max-width: 1900px;
  margin: 0 auto;
  width: 100%;
  //max-height: 100vh;
  //overflow-y: scroll;
  //scroll-snap-type: y mandatory;


  & > *{
    scroll-snap-align: start;

  }
`

const containerVariants = {
    initial: {
        // opacity: 0,
    },

    animate: {
        // opacity: 1,
        // y: 0,
    },

    exit: {
        // opacity: 0,
        // y: -40
    }
}

const HomePage = () => {

    const { locoRef, moScroll: { scrollPos} } = useContext(ScrollStateContext);
    const { transDetail } = useContext(AppStateContext);


    // const [fontLoaded, setFontLoaded] = useState(false);
    //
    // useFonts(setFontLoaded);
    //
    // locoRef.set(useLocoScroll(fontLoaded));

    useEffect(() => {
        return;
        if (scrollPos.get() && locoRef.get().current ){
            locoRef.get().current.scrollTo(scrollPos.get(), {
                duration : 0,
                disableLerp : true
            })
            scrollPos.set(null)
        }
    })

    return (
        <HomePageContainer variants={containerVariants}
                           transition={{
                               duration: 2,
                               ease: 'easeOut'
                           }}
                           initial="initial"
                           animate='animate'
                           // data-scroll-section={true}
                           className='homepage-container'
                           exit="exit">

            <Hero/>
            <About/>
            {/*<Testimonials/>*/}
            <Services/>
            <Portfolio/>
            <BLogs/>
            <Contact/>

            <Footer/>


        </HomePageContainer>
    );
};

export default HomePage;
