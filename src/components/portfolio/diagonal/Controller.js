// noinspection DuplicatedCode,JSIgnoredPromiseFromCall
// noinspection DuplicatedCode

import gsap from "gsap";
import charming from 'charming';

let winsize;
let allowTilt = true;
const calcWinsize = () => winsize = {width: window.innerWidth, height: window.innerHeight};
calcWinsize();
window.addEventListener('resize', calcWinsize);

const getMousePos = (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.pageX || e.pageY) {
        posx = e.pageX;
        posy = e.pageY;
    } else if (e.clientX || e.clientY) {
        posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
        posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
    }
    return {x: posx, y: posy}
};

// Some random chars.
const chars = ['$', '%', '#', '&', '=', '*', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '.', ':', ',', '^'];
const charsTotal = chars.length;

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
// Equation of a line (y = mx + b ).
const lineEq = (y2, y1, x2, x1, currentVal) => {
    const m = (y2 - y1) / (x2 - x1);
    const b = y1 - m * x1;
    return m * currentVal + b;
};

// Randomize letters function. Used when navigating the slideshow to switch the curretn slide´s texts.
const randomizeLetters = (letters) => {
    return new Promise((resolve, reject) => {
        const lettersTotal = letters.length;
        let cnt = 0;

        letters.forEach((letter, pos) => {
            let loopTimeout;
            const loop = () => {
                letter.innerHTML = chars[getRandomInt(0, charsTotal - 1)];
                loopTimeout = setTimeout(loop, getRandomInt(50, 500));
            };
            loop();

            const timeout = setTimeout(() => {
                clearTimeout(loopTimeout);
                letter.style.opacity = 1;
                letter.innerHTML = letter.dataset.initial;
                ++cnt;
                if (cnt === lettersTotal) {
                    resolve();
                }
            }, pos * lineEq(40, 0, 8, 200, lettersTotal));
        });
    });
};

// Hide each of the letters with random delays. Used when showing the current slide´s content.
const disassembleLetters = (letters) => {
    return new Promise((resolve, reject) => {
        const lettersTotal = letters.length;
        let cnt = 0;

        letters.forEach((letter, pos) => {
            setTimeout(() => {
                letter.style.opacity = 0;
                ++cnt;
                if (cnt === lettersTotal) {
                    resolve();
                }
            }, pos * 30);
        });
    });
}

class SlideItem {
    constructor(el) {
        this.DOM = {el}
        // The image wrap element.
        this.DOM.imgWrap = this.DOM.el.querySelector('.slide__img-wrap');
        // The image element.
        this.DOM.img = this.DOM.imgWrap.querySelector('.slide__img');

        this.DOM.texts = {
            wrap: this.DOM.el.querySelector('.slide__title-wrap'),
            title: this.DOM.el.querySelector('.slide__title'),
            number: this.DOM.el.querySelector('.slide__number'),
            side: this.DOM.el.querySelector('.slide__side'),
        };

        charming(this.DOM.texts.title);
        charming(this.DOM.texts.side);
        this.DOM.titleLetters = Array.from(this.DOM.texts.title.querySelectorAll('span')).sort(() => 0.5 - Math.random());
        this.DOM.sideLetters = Array.from(this.DOM.texts.side.querySelectorAll('span')).sort(() => 0.5 - Math.random());
        this.DOM.titleLetters.forEach(letter => letter.dataset.initial = letter.innerHTML);
        this.DOM.sideLetters.forEach(letter => letter.dataset.initial = letter.innerHTML);

        this.calcSizes()
        this.calcTransforms();
        this.initEvents()
    }

    initEvents() {
        this.mouseenterFn = () => {
            if (!this.isPositionedCenter() || !allowTilt) return;
            clearTimeout(this.mousetime);
            this.mousetime = setTimeout(() => {
                // Scale the image.
                gsap.to(this.DOM.img,  {
                    ease: 'Power3.easeOut',
                    scale: 1.1,
                    duration: 0.8
                });

            }, 40);
        };

        this.mousemoveFn = ev => requestAnimationFrame(() => {
            // Tilt the current slide.
            if (!allowTilt || !this.isPositionedCenter()) return;
            this.tilt(ev);
        });

        this.mouseleaveFn = (ev) => requestAnimationFrame(() => {
            if (!allowTilt || !this.isPositionedCenter()) return;
            clearTimeout(this.mousetime);

            // Reset tilt and image scale.
            gsap.to([this.DOM.imgWrap, this.DOM.texts.wrap], {
                ease: 'power4.easeOut',
                x: 0,
                y: 0,
                rotationX: 0,
                rotationY: 0,
                duration: 1.8
            });

            gsap.to(this.DOM.img,  {
                ease: 'power4.easeOut',
                scale: 1,
                duration: 1.8
            });
        });
        // When resizing the window recalculate size and transforms, since both will depend on the window size.
        this.resizeFn = () => {
            this.calcSizes();
            this.calcTransforms();
        };
        // this.DOM.imgWrap.addEventListener('mouseenter', this.mouseenterFn);
        // this.DOM.imgWrap.addEventListener('mousemove', this.mousemoveFn);
        // this.DOM.imgWrap.addEventListener('mouseleave', this.mouseleaveFn);
        window.addEventListener('resize', this.resizeFn);
    }

    isPositionedRight() {
        return this.isRight;
    }

    // Check if the slide is positioned on the left side (if it´s the previous slide in the slideshow).
    isPositionedLeft() {
        return this.isLeft;
    }

    // Check if the slide is the current one.
    isPositionedCenter() {
        return this.isCurrent;
    }

    tilt(ev) {

        const mousepos = getMousePos(ev);
        // Document scrolls.
        const docScrolls = {
            left: document.body.scrollLeft + document.documentElement.scrollLeft,
            top: document.body.scrollTop + document.documentElement.scrollTop
        };
        const bounds = this.DOM.imgWrap.getBoundingClientRect();

        // Mouse position relative to the main element (this.DOM.el).
        const relmousepos = {
            x: mousepos.x - bounds.left - docScrolls.left,
            y: mousepos.y - bounds.top - docScrolls.top
        };

        // Move the element from -20 to 20 pixels in both x and y axis.
        // Rotate the element from -15 to 15 degrees in both x and y axis.
        let t = {x: [-20, 20], y: [-20, 20]},
            r = {x: [-15, 15], y: [-15, 15]};

        const transforms = {
            translation: {
                x: (t.x[1] - t.x[0]) / bounds.width * relmousepos.x + t.x[0],
                y: (t.y[1] - t.y[0]) / bounds.height * relmousepos.y + t.y[0]
            },
            rotation: {
                x: (r.x[1] - r.x[0]) / bounds.height * relmousepos.y + r.x[0],
                y: (r.y[1] - r.y[0]) / bounds.width * relmousepos.x + r.y[0]
            }
        };

        // Move the image wrap.
        gsap.to(this.DOM.imgWrap,  {
            ease: 'Power1.easeOut',
            x: transforms.translation.x,
            y: transforms.translation.y,
            rotationX: transforms.rotation.x,
            rotationY: transforms.rotation.y,
            duration: 1.5
        });

        // Move the texts wrap.
        gsap.to(this.DOM.texts.wrap,  {
            ease: 'Power1.easeOut',
            x: -1 * transforms.translation.x,
            y: -1 * transforms.translation.y,
            duration: 1.5
        });
    }

    // Moves a slide to a specific position defined in settings.position.
    // Also, moves it from position settings.from and if we need to reset the image scale when moving the slide then settings.resetImageScale should be true.
    moveToPosition(settings) {
        return new Promise((resolve, reject) => {
            /*
            Moves the slide to a specific position:
            -2: left top corner outside the viewport
            -1: left top corner (prev slide position)
            0: center (current slide position)
            1: right bottom corner (next slide position)
            2: right bottom corner outside the viewport
            3: left side, for when the content is shown
            */
            gsap.to(this.DOM.imgWrap,  {
                duration: .8,
                ease: 'Power4.easeInOut',
                delay: settings.delay || 0,
                startAt: settings.from !== undefined ? {
                    x: this.transforms[settings.from + 2].x,
                    y: this.transforms[settings.from + 2].y,
                    rotationX: 0,
                    rotationY: 0,
                    rotationZ: this.transforms[settings.from + 2].rotation
                } : {},
                x: this.transforms[settings.position + 2].x,
                y: this.transforms[settings.position + 2].y,
                rotationX: 0,
                rotationY: 0,
                rotationZ: this.transforms[settings.position + 2].rotation,
                onStart: settings.from !== undefined ? () => gsap.set(this.DOM.imgWrap, {opacity: 1}) : null,
                onComplete: resolve
            });

            // Reset image scale when showing the content of the current slide.
            if (settings.resetImageScale) {
                gsap.to(this.DOM.img,  {
                    duration: .8,
                    ease: 'Power4.easeInOut',
                    scale: 1
                });
            }
        });
    }

    calcSizes() {
        this.width = this.DOM.imgWrap.offsetWidth;
        this.height = this.DOM.imgWrap.offsetHeight;
    }

    calcTransforms() {
        /*
        Each position corresponds to the position of a given slide:
        0: left top corner outside the viewport
        1: left top corner (prev slide position)
        2: center (current slide position)
        3: right bottom corner (next slide position)
        4: right bottom corner outside the viewport
        5: left side, for when the content is shown
        */
        this.transforms = [
            {x: -1 * (winsize.width / 2 + this.width), y: -1 * (winsize.height / 2 + this.height), rotation: -30},
            {x: -1 * (winsize.width / 2 - this.width / 3), y: -1 * (winsize.height / 2 - this.height / 3), rotation: 0},
            {x: 0, y: 0, rotation: 0},
            {x: winsize.width / 2 - this.width / 3, y: winsize.height / 2 - this.height / 3, rotation: 0},
            {x: winsize.width / 2 + this.width, y: winsize.height / 2 + this.height, rotation: 30},
            {x: -1 * (winsize.width / 2 - this.width / 2 - winsize.width * 0.075), y: 0, rotation: 0}
        ];

    }

    position(pos) {
        gsap.set(this.DOM.imgWrap, {
            x: this.transforms[pos].x,
            y: this.transforms[pos].y,
            rotationX: 0,
            rotationY: 0,
            opacity: 1,
            rotationZ: this.transforms[pos].rotation
        });
    }

    setCurrent(isContentOpen) {
        this.isCurrent = true;
        this.DOM.el.classList.add('slide--current', 'slide--visible');
        console.log('current : ', this.DOM.el.classList)
        // Position it on the current´s position.
        this.position(isContentOpen ? 5 : 2);
    }

    // Position the slide on the left side.
    setLeft(isContentOpen) {
        this.isRight = this.isCurrent = false;
        this.isLeft = true;
        this.DOM.el.classList.add('slide--visible');
        // Position it on the left position.
        this.position(isContentOpen ? 0 : 1);
    }

    // Position the slide on the right side.
    setRight(isContentOpen) {
        this.isLeft = this.isCurrent = false;
        this.isRight = true;
        this.DOM.el.classList.add('slide--visible');
        // Position it on the right position.
        this.position(isContentOpen ? 4 : 3);
    }

    reset() {
        console.log('recet class');

        this.isRight = this.isLeft = this.isCurrent = false;
        this.DOM.el.classList = 'slide';
    }

    hide() {
        gsap.set(this.DOM.imgWrap, {x: 0, y: 0, rotationX: 0, rotationY: 0, rotationZ: 0, opacity: 0});
    }

    hideTexts(animation = false) {
        if (animation) {
            disassembleLetters(this.DOM.titleLetters).then(() => gsap.set(this.DOM.texts.wrap, {opacity: 0}));
            disassembleLetters(this.DOM.sideLetters).then(() => gsap.set(this.DOM.texts.side, {opacity: 0}));
        } else {
            gsap.set(this.DOM.texts.wrap, {opacity: 0});
            gsap.set(this.DOM.texts.side, {opacity: 0});
        }
    }

    // Shows the current slide´s texts.
    showTexts(animation = true) {
        gsap.set(this.DOM.texts.wrap, {opacity: 1});
        gsap.set(this.DOM.texts.side, {opacity: 1});

        if (animation) {
            randomizeLetters(this.DOM.titleLetters);
            randomizeLetters(this.DOM.sideLetters);

            gsap.to(this.DOM.texts.number,  {
                // ease: Elastic.easeOut.config(1, 0.5),
                startAt: {x: '-10%', opacity: 0},
                x: '0%',
                opacity: 1,
                duration: 0.6,
            });
        }
    }
}


class DiagonalContainer {
    static Instance = null;

    static getInstance(el){
        if (this.Instance === null){
            this.Instance = new DiagonalContainer(el)
            return this.Instance
        }

        return this.Instance;
    }


    constructor(el) {
        this.DOM = {el};

        this.slides = Array.from(this.DOM.el.querySelectorAll('.slide')).map(slideEl => new SlideItem(slideEl));

        // The total number of slides.
        this.slidesTotal = this.slides.length;

        // Current slide position.
        this.current = 0;
        this.DOM.deco = this.DOM.el.querySelector('.slideshow__deco');

        this.render();
        this.currentSlide.showTexts(false);
        // Init/Bind events.
        this.initEvents();
    }

    render() {
        this.currentSlide = this.slides[this.current];
        this.nextSlide = this.slides[this.current + 1 <= this.slidesTotal - 1 ? this.current + 1 : 0];
        this.prevSlide = this.slides[this.current - 1 >= 0 ? this.current - 1 : this.slidesTotal - 1];
        this.currentSlide.setCurrent();
        this.nextSlide.setRight();
        this.prevSlide.setLeft();
    }

    initEvents() {
        // Clicking the next and previous slide starts the navigation / clicking the current shows its content..
        this.clickFn = (slide) => {
            if (slide.isPositionedRight()) {
                this.navigate('next');
            } else if (slide.isPositionedLeft()) {
                this.navigate('prev');
            } else {
                this.showContent();
            }
        };

        for (let slide of this.slides) {
            slide.DOM.imgWrap.addEventListener('click', () => this.clickFn(slide));
        }

        this.resizeFn = () => {
            // Reposition the slides.
            this.nextSlide.setRight(this.isContentOpen);
            this.prevSlide.setLeft(this.isContentOpen);
            this.currentSlide.setCurrent(this.isContentOpen);


        };
        window.addEventListener('resize', this.resizeFn);
    }

    showContent() {

    }

    hideContent() {

    }

    // Animates the element behind the current slide.
    bounceDeco(direction, delay) {
        gsap.to(this.DOM.deco,  {
            duration: .4,
            ease: 'Power2.easeIn',
            delay: delay + delay * 0.2,
            x: direction === 'next' ? -40 : 40,
            y: direction === 'next' ? -40 : 40,
            onComplete: () => {
                gsap.to(this.DOM.deco,  {
                    //ease: Elastic.easeOut.config(1, 0.65),
                    duration: 0.6,
                    ease: 'Power2.easeOut',
                    x: 0,
                    y: 0
                });
            }
        });
    }

    navigate(direction) {
        // If animating return.
        if (this.isAnimating) return;
        this.isAnimating = true;
        allowTilt = false;

        const upcomingPos = direction === 'next' ?
            (this.current < this.slidesTotal - 2 ? this.current + 2 : Math.abs(this.slidesTotal - 2 - this.current))
            :
            (this.current >= 2 ? this.current - 2 : Math.abs(this.slidesTotal - 2 + this.current));


        this.upcomingSlide = this.slides[upcomingPos];

        // Update current.
        this.current = direction === 'next' ?
            this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
            this.current > 0 ? this.current - 1 : this.slidesTotal - 1;

        // Move slides (the previous, current, next and upcoming slide).
        this.prevSlide.moveToPosition({
                position: direction === 'next' ? -2 : 0,
                delay: direction === 'next' ? 0 : 0.14
            }).then(() => {
            if (direction === 'next') {
                this.prevSlide.hide(); //hide it b/c it is offscreen
            }
        });

        this.currentSlide.moveToPosition({
                position: direction === 'next' ? -1 : 1,
                delay: 0.07
            });
        this.currentSlide.hideTexts();

        this.bounceDeco(direction, 0.07);

        this.nextSlide.moveToPosition({
            position: direction === 'next' ? 0 : 2,
            delay: direction === 'next' ? 0.14 : 0
        }).then(() => {
            if (direction === 'prev') {
                this.nextSlide.hide();
            }
        });

        if (direction === 'next') {
            this.nextSlide.showTexts();
        } else {
            this.prevSlide.showTexts();
        }

        this.upcomingSlide.moveToPosition({
            position: direction === 'next' ? 1 : -1,
            from: direction === 'next' ? 2 : -2,
            delay: 0.21
        }).then(() => {
            // Reset classes.
            [this.nextSlide, this.currentSlide, this.prevSlide].forEach(slide => slide.reset());
            this.render();
            allowTilt = true;
            this.isAnimating = false;
        });
    }
}


export default DiagonalContainer