import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {useHistory} from "react-router";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    dialogBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4)
    },
    nextTopic: {
        paddingTop: theme.spacing(2)
    },
    emoji: {
        fontSize: "200%"
    },
    loginButton: {
        fontFamily: "Arimo",
        textTransform: "none",
        fontSize: "16px"
    }
}));

export default function PopupRegistrationSuccess({openStatus}) {
    const classes = useStyles();
    const history = useHistory();

    function goToLogin() {
        history.push("/login");
    }

    return (
        <Dialog
            open={openStatus}
            onClose={goToLogin}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Box className={classes.dialogBox}>
                <Box>
                    <Typography variant="h6" align="center">
                        Danke für Deine Registrierung!
                    </Typography>
                </Box>
                <Box className={classes.nextTopic}>
                    <span className={classes.emoji}
                          role="img"
                          aria-labelledby="party-emoji">
                        🥳
                    </span>
                </Box>
                <Box className={classes.nextTopic}>
                    <Button className={classes.loginButton}
                            onClick={goToLogin}
                            color="primary">
                        Weiter zum Login
                    </Button>
                </Box>
            </Box>
        </Dialog>

    )
}