import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    link: {
        color: "#009899",
        textDecoration: "none",
        '&:hover': {
            color: "#dfa528"
        }
    }
}));

export default function PopupLunchMatch({showPopup, setShowPopup, matchData}) {
    const classes = useStyles();

    function handleClosePopup() {
        setShowPopup(false);
    }

    return (
        <Dialog
            open={showPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                Neues Lunch-Match!
                <span role="img" aria-labelledby="party-emoji"> 🎉</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Kontaktiere {matchData.firstName}, um einen Termin zum Lunchen zu vereinbaren.
                    <br/><br/>
                    E-Mail-Adresse: <a className={classes.link} href={`mailto:${matchData.username}`}>
                    {matchData.username}
                </a>
                    <br/><br/>
                    Handynummer: <a className={classes.link} href={`tel:${matchData.phoneNumber}`}>
                    {matchData.phoneNumber}
                </a>
                    <br/><br/>
                    Du kannst die Kontaktdaten deines Matches auch jederzeit zu einem späteren Zeitpunkt in deiner
                    Nachrichtenbox anschauen.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClosePopup} color="primary">
                    Weitere Matches finden
                </Button>
            </DialogActions>
        </Dialog>
    )
}