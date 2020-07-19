import React from "react";
import Dialog from "@material-ui/core/Dialog";
import {useHistory} from "react-router";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function PopupRegistrationSuccess({openStatus}) {
    const history = useHistory();

    function goToLogin() {
        history.push("/login");
    }

    return (
        <Dialog
            open={openStatus}
            onClose={goToLogin}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">Danke für Deine Registrierung!</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Klick auf den Button, um Dich einzuloggen.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={goToLogin} color="primary">
                    Login
                </Button>
            </DialogActions>
        </Dialog>
    )
}