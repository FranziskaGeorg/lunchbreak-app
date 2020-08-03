import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    snackbar: {
        bottom: "5%",
        padding: theme.spacing(4),
        position: "fixed"
    },
    alert: {
        backgroundColor: "#dfa528",
        fontFamily: "Arimo",
        fontSize: "16px",
        textAlign: "center"
    },
}));

export default function SnackbarLoginFailed({showSnackbar, setShowSnackbar}) {
    const classes = useStyles();

    function Alert(props) {
        return <MuiAlert className={classes.alert} elevation={6} variant="filled" {...props}/>;
    }

    function handleCloseSnackbar() {
        setShowSnackbar(false);
    }

    return (
        <Snackbar
            className={classes.snackbar}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={showSnackbar}
            onClose={handleCloseSnackbar}>
            <Alert onClose={handleCloseSnackbar} severity="error">
                Diese Kombination aus E-Mail-Adresse und Passwort kennen wir leider nicht. Versuch es bitte noch einmal.
            </Alert>
        </Snackbar>
    )
}