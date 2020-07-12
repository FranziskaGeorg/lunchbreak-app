import {createMuiTheme} from "@material-ui/core/styles";

const LunchBreakTheme = createMuiTheme({
    palette: {
        primary:
            {
                main: '#009899'
            },
        secondary:
            {
                main: '#b3d5d4'
            },
        success:
            {
                main: '#dfa528'
            },
        info:
            {
                main: '#ffffff'
            }
    },
    typography: {
        h4: {
            fontFamily: 'Pacifico'
        }
    }
});

export default LunchBreakTheme;