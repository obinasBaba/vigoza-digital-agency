import {useEffect, useRef} from "react";

const useSkew = () => {
    const scrollRef = useRef(null);

    const skewConfigs = {
        ease: .1,
        current: 0,
        previous: 0,
        rounded: 0
    };

    useEffect(() => {
        // document.body.style.height = `${scrollRef.current.getBoundingClientRect().height}px`;
    })

    useEffect(() => {
        // skewScrolling();
    }, []);

    const skewScrolling = () => {
        skewConfigs.current = window.scrollY;
        skewConfigs.previous += (skewConfigs.current - skewConfigs.previous) * skewConfigs.ease;
        skewConfigs.rounded = Math.round(skewConfigs.previous * 100) / 100;

        const diff = skewConfigs.current - skewConfigs.rounded;
        const acc = diff / window.innerWidth;
        const velocity = +acc;
        const skew = velocity * 7.5;

        scrollRef.current.style.transform =
            `translate3d(0, -${skewConfigs.rounded}px, 0) skewY(${skew}deg);`;

        // requestAnimationFrame( () => skewScrolling());
    }
}