import {useAnimation} from "framer-motion";

export default () => {
   return [
        {
            img: 'img/1.jpg', controller: useAnimation(),
            text: {
                side: 'Memories &amp; Thoughts',
                title: "Automation",
                subtitle: "A tree needs to be your friend if you're going to paint him"
            }
        },
        {
            img: 'img/2.jpg',
            controller: useAnimation(),
            text: {
                side: 'Random Roam',
                title: "Machines",
                subtitle: "This is probably the greatest thing to happen in my life"
            }
        },
        {
            img: 'img/3.jpg', controller: useAnimation(), text: {
                side: 'Arbitrary Words',
                title: "Coexistence",
                subtitle: "The only guide is your heart"
            }
        },
        {
            img: 'img/4.jpg',
            controller: useAnimation(),
            text: {
                side: 'Haunted Drift',
                title: "Bellamio",
                subtitle: "The only prerequisite is that it makes you happy"
            }
        },
        {
            img: 'img/5.jpg', controller: useAnimation(), text: {
                side: 'Fun Diverge',
                title: "Pastures",
                subtitle: "Let's go up in here, and start having some fun"
            }
        },
        {
            img: 'img/6.jpg', controller: useAnimation(), text: {
                side: 'Hopes &amp; Dreams',
                title: "Focus",
                subtitle: "This is unplanned it really just happens"
            }
        }
    ]
}