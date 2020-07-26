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
                main: '#b3d5d4' // light turquoise
            },
        info:
            {
                main: '#ffffff' // white
            }
    },

    typography: {
        h3: {
            fontFamily: "Arimo",
            color: "#575757"
        },
        h4: {
            fontFamily: 'Pacifico'
        },
        h5: {
            fontFamily: "Arimo",
            fontWeight: "bold",
            color: "#575757"
        },
        caption: {
            fontFamily: "Arimo",
            color: '#dfa528'
        }
    }

});

export default LunchBreakTheme;