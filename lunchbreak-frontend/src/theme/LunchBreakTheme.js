import {createMuiTheme} from "@material-ui/core/styles";

const LunchBreakTheme = createMuiTheme({
    palette: {
        primary:
            {
                main: '#009899' // turquoise
            },
        secondary:
            {
                main: '#dfa528' // sandy yellow
            },
        error:
            {
                main: '#eef5f6' // light turquoise
            },
        info:
            {
                main: '#ffffff' // white
            }
    },

    typography: {
        h3: {
            fontFamily: "Quicksand",
            color: "#575757",
            textShadow: "none"
        },
        h4: {
            fontFamily: 'Pacifico'
        },
        h5: {
            fontFamily: "Quicksand",
            color: "#575757",
            textShadow: "none"
        },
        h6: {
            fontFamily: "Quicksand",
            fontWeight: "normal",
            color: "#575757",
            textShadow: "none"
        },
        caption: {
            fontFamily: "Quicksand",
            color: '#dfa528'
        },
        body1: {
            fontFamily: "Quicksand",
            color: "#575757"
        }
    }

});

export default LunchBreakTheme;