import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonContained: {
        fontFamily: "Arimo",
        fontWeight: "bold",
        textTransform: "none"
    }
}));

export default function ButtonTurquoiseNoAction({handleClick, buttonText, buttonSize, icon}) {
    const classes = useStyles();

    return (
        <Button
            color="primary"
            className={classes.buttonContained}
            size={buttonSize}
            onClick={(event) => handleClick()}
            startIcon={icon}
        >
            {buttonText}
        </Button>
    )
}