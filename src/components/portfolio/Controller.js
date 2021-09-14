import Charming from 'charming'
import {getRandomFloat, lerp, lineEq} from "../../helpers/utils";
import {MotionValue} from "framer-motion";
import PointerCursor from "../Fixed/CustomMouse/PointerCursor";
import gsap from "gsap";

const activeTilt = {
    columns: true,
    letters: true,
}

export const values = {
    scroll: {
        left: new MotionValue(0),
        top: new MotionValue(0),
    }
}


class MenuItem {

    static instance = null;
    shuffledLetters = []
    el;

    static getInstance(el) {
        if (this.instance === null) {
            this.instance = new MenuItem(el)
            return this.instance
        } else return this.instance;
    }


    constructor(el) {
        this.el = el
        Charming(el);
        this.letters = [...this.el.querySelectorAll('span')]
        this.totRandLetter = 3;

        this.lettersTranslations = Array.from({length: this.totRandLetter}, _ => {
            const tr = getRandomFloat(4, 15);
            return [-tr, tr]
        })

        this.lettersRotation = Array.from({length: this.totRandLetter}, _ => {
            const rr = getRandomFloat(0, 10)
            return [-rr, rr]
        })

        this.initEvents()
        console.log('menuItem = Consactractor')

    }

    initEvents() {
        // Initialize the random letters of the menu item that move when hovering
        this.mouseenterFun = _ => {
            const shuffled = [...this.letters].sort(_ => .5 - Math.random());
            this.shuffledLetters = shuffled.slice(0, this.totRandLetter)
        }

        this.mousemoveFun = ev => requestAnimationFrame(() => this.tilt(ev))

        this.mouseleaveFun = _ => this.resetTilt();


        this.el.addEventListener('mouseenter', this.mouseenterFun);
        this.el.addEventListener('mousemove', this.mousemoveFun);
        this.el.addEventListener('mouseleave', this.mouseleaveFun);
    }

    tilt(ev) {
        if (!activeTilt.letters) return;

        const bounds = this.el.getBoundingClientRect();


        // mouse pos relative to the main element (this.el)
        const relMousePos = {
            x: PointerCursor.x.get() - bounds.left,
            y: PointerCursor.y.get() - bounds.top,
        }


        for (const [idx, letter] of this.shuffledLetters.entries()) {

            const y = lineEq(
                this.lettersTranslations[idx][1],
                this.lettersTranslations[idx][0],
                bounds.height,
                0,
                relMousePos.y
            );
            const rotation = lineEq(
                this.lettersRotation[idx][1],
                this.lettersRotation[idx][0],
                bounds.height,
                0,
                relMousePos.y
            );

            gsap.to(letter, {
                duration: .3,
                y,
                rotation,
                ease: 'expo.out',
            })
        }

    }

    resetTilt() {
        if (!activeTilt.letters) return;
        gsap.timeline()
            .to(this.shuffledLetters, {
                duration: .2,
                ease: 'power1.out',
                y: PointerCursor.direction === 'up' ? '-=80%' : '+=80',
                rotation: PointerCursor.direction === 'up' ? '-=10' : '+=10',
                opacity: 0,
            }).to(this.shuffledLetters, {
            stagger: 0.02,
            duration: .8,
            ease: 'elastic.out(1, 0.4)',
            startAt: {y: PointerCursor.direction === 'up' ? '80%' : '-80%', opacity: 0},
            y: '0%',
            rotation: 0,
            opacity: 1
        })

    }
}

export class Menu {

    static instance = null;
    shuffledLetters = []
    el;

    static getInstance(el) {
        if (this.instance === null) {
            this.instance = new Menu(el)
            return this.instance
        } else return this.instance;
    }

    constructor(el) {
        console.log('menu = Consactractor')

        this.DOM = {el}
        this.DOM.items = document.querySelectorAll('.menu > .menu_item')
        this.menuItems = Array.from(this.DOM.items, item => new MenuItem(item))
    }
}

export class Column {


    static instance = null;
    shuffledLetters = []
    el;

    /*static getInstance(el) {
        if (this.instance === null) {
            this.instance = new Column(el)
            return this.instance
        } else return this.instance;
    }*/

    constructor(el) {
        this.el = el
        this.hegiht = this.el.getBoundingClientRect().height;
        this.isBottom = this.el.classList.contains('column--bottom')
        this.tilt()
    }

    tilt() {
        let translationVal = {tx: 0, ty: 0};
        const randX = getRandomFloat(5, 20);
        const rY1 = this.isBottom ? getRandomFloat(10, 30) : getRandomFloat(30, 80);
        const rY2 = this.isBottom ? getRandomFloat(30, 80) : getRandomFloat(10, 30)

        const render = () => {
            if (activeTilt.columns) {
                translationVal.tx = lerp(
                    translationVal.tx,
                    lineEq(-randX, randX, window.innerWidth, 0, PointerCursor.x.get()),
                    .03
                )

                translationVal.ty = lerp(
                    translationVal.ty,
                    lineEq(-rY1, rY2, window.innerHeight, 0, PointerCursor.y.get()),
                    .03
                )

                gsap.set(this.el, {
                    x: translationVal.tx,
                    y: translationVal.ty,
                    rotation: 0.1,
                })

            } else {
                translationVal = {tx: 0, ty: 0}
            }

            requestAnimationFrame(render)
        }

        requestAnimationFrame(render)
    }
}