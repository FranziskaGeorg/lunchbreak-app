import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import makeStyles from "@material-ui/core/styles/makeStyles";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
    snackbar: {
        top: "20%",
        padding: theme.spacing(4),
        position: "absolute"
    },
    snackbarContent: {
        backgroundColor: "#dfa528",
        fontFamily: "Arimo",
        fontSize: "18px",
        textAlign: "center"
    },
    link: {
        color: "#ffffff",
        textDecoration: "none",
        '&:hover': {
            color: "ffffff",
            textDecoration: "none"
        }
    }
}));

export default function SnackbarFillProfile({showSnackbar}) {
    const classes = useStyles();

    return (
        <Snackbar
            className={classes.snackbar}
            anchorOrigin={{vertical: "top", horizontal: "center"}}
            open={showSnackbar}>
            <Link className={classes.link} href={"/profile"}>
                <SnackbarContent
                    className={classes.snackbarContent}
                    message="Bitte füll zuerst Dein Profil aus, damit Deine Kollegen etwas mehr über Dich erfahren.">
                </SnackbarContent>
            </Link>
        </Snackbar>
    );
}