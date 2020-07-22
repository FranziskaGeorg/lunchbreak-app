import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function PopupLunchMatch({showPopup, setShowPopup, matchData}) {

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
                <span role="img" aria-labelledby="party-emoji">🎉</span>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Kontaktiere {matchData.firstName}, um einen Termin zum Lunchen zu vereinbaren.
                    <br/><br/>E-Mail-Adresse: {matchData.username}
                    <br/><br/>Handynummer: {matchData.phoneNumber}
                    <br/><br/>
                    Du kannst die Kontaktdaten deines Matches auch jederzeit zu einem späteren Zeitpunkt in deiner Nachrichtenbox anschauen.
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