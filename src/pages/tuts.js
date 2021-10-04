import React, {useEffect, useRef, useState} from 'react';
import {Container} from "@material-ui/core";

const Tuts = () => {

    const ren =  useRef(0)
    const [i, setI] = useState(0)



    useEffect(() => {
        console.log('useEffect ', ren.current)
    }, [])

    return (
        <Container maxWidth='xs' style={{
            marginTop: '4rem'
        }}>
            <input type="text" onChange={() => {
                setI(ren.current++)
            }}/>
            <h1>{ren.current}</h1>
        </Container>
    );
};

export default Tuts;
