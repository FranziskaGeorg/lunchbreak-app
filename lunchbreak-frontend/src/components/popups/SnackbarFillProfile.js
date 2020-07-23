import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';

export default function SnackbarFillProfile({showSnackbar, setShowSnackbar}) {

    function handleCloseSnackbar() {
        setShowSnackbar(false);
    }

    return (
        <Snackbar
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            open={showSnackbar}
            onClose={handleCloseSnackbar}
            message="Bitte füll zuerst Dein Profil aus, damit Deine Kollegen etwas mehr über Dich erfahren."
        />
    );
}