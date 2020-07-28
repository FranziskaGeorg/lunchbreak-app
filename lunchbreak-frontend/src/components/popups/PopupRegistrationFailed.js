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
    backToRegistrationButton: {
        fontFamily: "Arimo",
        textTransform: "none",
        fontSize: "16px"
    }
}));

export default function PopupRegistrationFailed({openStatus}) {
    const classes = useStyles();
    const history = useHistory();

    function goToRegistration() {
        history.push("/register");
    }

    return (
        <Dialog
            open={openStatus}
            onClose={goToRegistration}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Box className={classes.dialogBox}>
                <Box>
                    <span className={classes.emoji}
                          role="img"
                          aria-labelledby="oh-no-emoji">
                        🙈
                    </span>
                </Box>
                <Box className={classes.nextTopic}>
                    <Typography variant="h6" align="center">
                        Das war leider nichts...
                    </Typography>
                </Box>
                <Box className={classes.nextTopic}>
                    <Typography variant="body1" align="center">
                        Zu der angegebenen E-Mail-Adresse existiert bereits ein Account.
                        Bitte versuch es mit einer anderen.
                    </Typography>
                </Box>
                <Box className={classes.nextTopic}>
                    <Button className={classes.backToRegistrationButton}
                            onClick={goToRegistration}
                            color="primary">
                        Neuer Versuch
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}