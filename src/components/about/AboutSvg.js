import React from 'react';
import styled from "styled-components";
import {useMediaQuery, useTheme} from "@material-ui/core";


const ImgSvg = () => {

    const theme = useTheme();
    const matches = useMediaQuery( theme.breakpoints.up( 'sm' ) )


    return matches ? <svg className="bars desktop" width="100%" height="100%" viewBox="0 0 1000 562.5"
                          preserveAspectRatio="xMinYMin meet">
            <defs>
                <pattern id="pattern-602e0271028d1" patternUnits="userSpaceOnUse"
                         width="100%" height="100%">
                    <image className="stretch-x"
                           xlinkHref="./img/about.jpg"
                           width="100%" height="100%"/>
                </pattern>
            </defs>
            <g>
                <path
                    d="M8,0 h884 a8,8 0 0 1 8,8 v90.1 a8,8 0 0 1
                    -8,8 h-884 a8,8 0 0 1 -8,-8 v-90.1 a8,8 0 0 1 8,-8"/>
                <path
                    d="M108,114.1 h884 a8,8 0 0 1 8,8 v90.1 a8,8
                     0 0 1 -8,8 h-884 a8,8 0 0 1 -8,-8 v-90.1 a8,8 0 0 1 8,-8"/>
                <path
                    d="M58,228.2 h784 a8,8 0 0 1 8,8 v90.1 a8,8 0 0 1
                     -8,8 h-784 a8,8 0 0 1 -8,-8 v-90.1 a8,8 0 0 1 8,-8"/>
                <path
                    d="M158,342.3 h734 a8,8 0 0 1 8,8 v90.1 a8,8 0 0
                     1 -8,8 h-734 a8,8 0 0 1 -8,-8 v-90.1 a8,8 0 0 1 8,-8"/>
                <path
                    d="M8,456.4 h934 a8,8 0 0 1 8,8 v90.1 a8,8 0 0 1
                     -8,8 h-934 a8,8 0 0 1 -8,-8 v-90.1 a8,8 0 0 1 8,-8"/>
            </g>
        </svg>

        :

        <svg className="bars mobile" width="182%" height="100%" viewBox="350 -0 1000 562.5"
             preserveAspectRatio="xMinYMin meet">
            <defs>
                <pattern id="pattern-602e0271028d1" patternUnits="userSpaceOnUse"
                         width="100%" height="100%">
                    <image className="stretch-x"
                           xlinkHref="./img/about.jpg"
                           width="100%" height="100%"/>
                </pattern>
            </defs>
            <g>
                <path d="M0,0 h892 a8,8 0 0 1 8,8 v118.625 a8,8 0 0 1 -8,8 h-892 v-134.625"/>
                <path d="M0,142.625 h792 a8,8 0 0 1 8,8 v118.625 a8,8 0 0 1 -8,8 h-792 v-134.625"/>
                <path d="M0,285.25 h742 a8,8 0 0 1 8,8 v118.625 a8,8 0 0 1 -8,8 h-742 v-134.625"/>
                <path d="M0,427.875 h842 a8,8 0 0 1 8,8 v118.625 a8,8 0 0 1 -8,8 h-842 v-134.625"/>
            </g>
        </svg>;
};

export default ImgSvg;
