import React, {useContext, useEffect, useState} from 'react';
import {AppStateContext} from "../../../contexts/AppStateContext";
import {debounce, Slide} from "@material-ui/core";
import {useMotion} from "react-use";
import {useMotionValue} from "framer-motion";

function HideOnScroll({ children }) {
    const [slide, setSlide] = useState(true)

    const {moScroll: {scrollDirection},} = useContext(AppStateContext)


    useEffect(() => {


            let callback = debounce((arg) => {
                if ( !arg ) return;

                if ( arg === 'up' )
                    setSlide(true)
                else if ( arg === 'down' )
                    setSlide(false)


            }, 300)

            scrollDirection.onChange(callback)

            return () => {}
        },
        [])


    return (
        <Slide appear={false} direction="down" in={slide}>
            {children}
        </Slide>
    )
}


export default HideOnScroll;
