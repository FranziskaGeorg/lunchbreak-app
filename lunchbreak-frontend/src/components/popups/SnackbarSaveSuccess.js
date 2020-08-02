import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    snackbar: {
        bottom: "8%",
        padding: theme.spacing(4),
        position: "fixed"
    },
    alert: {
        backgroundColor: "#009899",
        fontFamily: "Arimo",
        fontSize: "14px",
        textAlign: "center"
    },
}));

export default function SnackbarSaveSuccess({showSnackbar, setShowSnackbar}) {
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
            <Alert onClose={handleCloseSnackbar} severity="success">
                Deine Änderungen wurden gespeichert
            </Alert>
        </Snackbar>

    )
}