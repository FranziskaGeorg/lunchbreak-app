import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function PopupLunchMatch({showPopup}, {setShowPopup}) {

    console.log(showPopup);

    function handleClosePopup() {
        setShowPopup(false);
        return showPopup;
    }

    return (
        <Dialog
            open={showPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Neues Lunch-Match!</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Kontaktiere , um einen Termin zum Lunchen zu vereinbaren.
                    <br/>
                    E-Mail-Adresse:
                    <br/>
                    Handynummer:
                    <br/>
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