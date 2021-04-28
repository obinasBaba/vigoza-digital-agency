import {createMuiTheme, responsiveFontSizes} from "@material-ui/core";
import {deepOrange, grey, orange} from "@material-ui/core/colors";

let theme = createMuiTheme({

    overrides: {
        MuiCssBaseline: {
            '@global': {
                html: {
                    fontSize: 'calc(1vw + 0.6em)',
                },
            }
        }
    },

    palette: {
        primary: {
            main: grey[500]
        },
        secondary: {
            main: deepOrange["A400"]
        },
        text: {
            // primary: '#ffffff'
        }
    },
    typography: {

        fontFamily: [
            "Inconsolata, monospace",
            "Poppins, sans-serif"
        ].join(','),
        h1: {
            fontFamily: 'abyssopelagic',
            textTransform: 'uppercase',
            letterSpacing: '2px'
        },

        body1: {
            letterSpacing: '2px'
        },
    }
})

theme = responsiveFontSizes(theme)

export {theme}

