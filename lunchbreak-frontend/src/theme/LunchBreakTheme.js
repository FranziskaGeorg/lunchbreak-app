import {createMuiTheme} from "@material-ui/core/styles";

const LunchBreakTheme = createMuiTheme({
    palette: {
        primary:
            {
                main: '#009899' // turquoise
            },
        secondary:
            {
                main: '#b3d5d4' // light turquoise
            },
        error:
            {
                main: '#dfa528' // sandy yellow
            },
        info:
            {
                main: '#ffffff' // white
            },
        background:
            {
                //default: '#f8f8f8' // light grey
                default: "#eef5f6" // light turquoise
            }
    },

    typography: {
        h4: {
            fontFamily: 'Pacifico'
        },
        h5: {
            fontFamily: "Arimo",
            fontWeight: "bold",
            color: "#575757"
        },
        p: {
            fontFamily: 'Arimo'
        }
    },

    overrides: {
        MuiFilledInput: {
            color: "yellow"
        }
    }
});

export default LunchBreakTheme;