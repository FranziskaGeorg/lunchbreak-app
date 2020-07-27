import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonNonContained: {
        fontFamily: "Arimo",
        fontWeight: "bold",
        textTransform: "none"
    }
}));

export default function ButtonTurquoiseNoAction({buttonText, buttonSize, icon}) {
    const classes = useStyles();

    return (
        <Button
            color="primary"
            className={classes.buttonNonContained}
            size={buttonSize}
            component="span"
            startIcon={icon}
        >
            {buttonText}
        </Button>
    )
}