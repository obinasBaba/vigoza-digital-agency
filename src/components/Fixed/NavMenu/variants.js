import {transition} from "../../../helpers/variants";

export const containerVariants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition : {
            ...transition,
            duration: .6,
            when: 'beforeChildren',
        },
    },

    exit: {
        opacity: 0,
        transition : {
            ...transition,
            duration: .6,
            delay: .5,
        },
    },

}

export const menuVariants = {
    initial: {

    },
    animate: {

        transition : {
            ...transition,
            staggerChildren: 0.1,
        },
    },

    exit: {
        transition : {
            ...transition,
            staggerChildren: 0.1,
            staggerDirection: -1,
        },
    },
}

export const menuItemVariants = {
    initial: {
        opacity: 0,
        x: 20
    },
    animate: {
        opacity: 1,
        x: 0,
    },

    exit: {
        opacity: 0,
        x: 60,
        transition : {
            ...transition,
        },
    },
}