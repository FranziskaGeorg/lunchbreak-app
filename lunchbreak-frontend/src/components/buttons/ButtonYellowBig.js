import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonContained: {
        color: "#ffffff",
        fontFamily: "Arimo",
        fontWeight: "bold",
        textTransform: "none"
    }
}));

export default function ButtonYellowBig({handleClick, buttonText, buttonSize}) {
    const classes = useStyles();

    return (
        <Button
            color="secondary"
            className={classes.buttonContained}
            variant="contained"
            size={buttonSize}
            onClick={(event) => handleClick()}
        >
            {buttonText}
        </Button>
    )
}