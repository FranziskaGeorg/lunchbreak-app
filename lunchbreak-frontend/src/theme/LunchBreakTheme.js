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
        success:
            {
                main: '#dfa528' // sandy yellow
            },
        info:
            {
                main: '#ffffff' // white
            },
        background:
            {
                default: '#f8f8f8' // light grey
            }
    },

    typography: {
        h4: {
            fontFamily: 'Pacifico'
        },
        p: {
            fontFamily: 'Arimo'
        }
    }
});

export default LunchBreakTheme;