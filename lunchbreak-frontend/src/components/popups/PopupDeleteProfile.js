import React from "react";
import Dialog from "@material-ui/core/Dialog";
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
    dialogButton: {
        fontFamily: "Arimo",
        textTransform: "none",
        fontSize: "16px"
    }
}));

export default function PopupDeleteProfile({showPopup, setShowPopup}) {
    const classes = useStyles();

    function handleClosePopup() {
        setShowPopup(false);
    }

    return (
        <Dialog
            open={showPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Box className={classes.dialogBox}>
                <Box>
                    <span className={classes.emoji}
                          role="img"
                          aria-labelledby="oh-no-emoji">
                        😱
                    </span>
                </Box>
                <Box className={classes.nextTopic}>
                    <Typography variant="body1" align="center">
                        Sicher, dass Du Dein Nutzerprofil löschen möchtest? Diesen Schritt kannst Du danach nicht mehr rückgängig machen.
                    </Typography>
                </Box>
                <Box className={classes.nextTopic}>
                    <Button className={classes.dialogButton}
                            onClick={handleClosePopup}
                            color="primary">
                        Abbrechen
                    </Button>
                    <Button className={classes.dialogButton}
                            onClick={handleClosePopup}
                            color="primary">
                        Ja, bitte löschen.
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}