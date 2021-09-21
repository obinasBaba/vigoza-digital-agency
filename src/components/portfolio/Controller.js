import Charming from 'charming'
import {getRandomFloat, lerp, lineEq} from "../../helpers/utils";
import {MotionValue} from "framer-motion";
import PointerCursor from "../Fixed/CustomMouse/PointerCursor";
import gsap from "gsap";
import charming from "charming";

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

    shuffledLetters = []
    el;

    constructor(el) {
        this.el = el
        // Charming(el);
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

    tilt() {
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
        this.DOM = {el}
        this.DOM.items = document.querySelectorAll('.menu > .menu_item')
        this.menuItems = Array.from(this.DOM.items, item => new MenuItem(item))

        this.initEvents()
    }

    initEvents(){
        // Clicking a menu item opens up the content item and hides the menu (items)
        for (let menuItem of this.menuItems) {
            // menuItem.el.addEventListener('click', () => this.openItem(menuItem));
        }
    }

    openItem(menuItem){
        if (this.isAnimating) return;

        this.isAnimating = true;

        this.currentItem = this.menuItems.indexOf(menuItem);

        // Set the content item to current
        // const contentItem = contentItems[this.currentItem];
        // contentItem.setCurrent();

        activeTilt.columns = false;
        activeTilt.letters = false;

        // const duration = 1.2;
        // const ease = new Ease(BezierEasing(1, 0, 0.735, 0.775));
        // const columnsStagger = 0;

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

class ContentItem {
    constructor(el) {
        this.DOM = {el: el};
        this.DOM.title = this.DOM.el.querySelector('.item__content-title');
        // Create spans out of every letter
        charming(this.DOM.title);
        this.DOM.titleLetters = [...this.DOM.title.querySelectorAll('span')];
        this.titleLettersTotal = this.DOM.titleLetters.length;

        this.DOM.backCtrl = this.DOM.el.querySelector('.item__content-back');
        this.initEvents()
    }
    initEvents() {
        this.DOM.backCtrl.addEventListener('click', (ev) => {
            ev.preventDefault();
            // menu.closeItem()
        });
    }
    setCurrent() {
        this.DOM.el.classList.add('item--current');
    }
    resetCurrent() {
        this.DOM.el.classList.remove('item--current');
    }
}

/*const content = {
    first: document.querySelector('.content--first'),
    second: document.querySelector('.content--second')
};

// Content items
const contentItems =
    Array.from(content.second.querySelectorAll('.item'),
            item => new ContentItem(item));*/

