import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import makeStyles from "@material-ui/core/styles/makeStyles";
import SnackbarContent from "@material-ui/core/SnackbarContent";

const useStyles = makeStyles((theme) => ({
    snackbar: {
        bottom: "15%"
    },
    snackbarContent: {
        backgroundColor: "#dfa528",
        fontFamily: "Arimo",
        fontSize: "16px"
    }
}));

export default function SnackbarFillProfile({showSnackbar}) {
    const classes = useStyles();

    return (
        <Snackbar
            className={classes.snackbar}
            anchorOrigin={{vertical: "bottom", horizontal: "center"}}
            open={showSnackbar}
        >
            <SnackbarContent
                className={classes.snackbarContent}
                message="Bitte füll zuerst Dein Profil aus, damit Deine Kollegen etwas mehr über Dich erfahren."
            />
        </Snackbar>
    );
}