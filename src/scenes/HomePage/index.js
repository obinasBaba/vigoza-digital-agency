import React from 'react';
import styled from "styled-components";
import {motion} from "framer-motion";
import Fixed from "../../components/Fixed";
import Hero from "../../components/hero";
import About from "../../components/about";
import Services from "../../components/services";
import Portfolio from "../../components/portfolio";
import BLogs from "../../components/blog";
import Contact from "../../components/contact";
import Footer from "../../components/Footer";

const HomePageContainer = styled(motion.main)`
  max-width: 1600px;
  margin: 0 auto;
  width: 100%;
`

const containerVariants = {
    initial: {
        opacity: 0,
    },

    animate: {
        opacity: 1,
        y: 0,
    },

    exit: {
        opacity: 0,
        y: -40
    }
}

const HomePage = () => {
    return (
        <HomePageContainer variants={containerVariants}
                           transition={{
                               duration: 2,
                               ease: 'easeOut'
                           }}
                           initial="initial"
                           animate='animate'
                           exit="exit">

            <Fixed/>
            <Hero/>
            <About/>
            <Services/>
            <Portfolio/>
            <BLogs/>
            <Contact/>
            <Footer/>


        </HomePageContainer>
    );
};

export default HomePage;
