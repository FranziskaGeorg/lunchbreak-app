import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonContained: {
        color: "#ffffff",
        fontFamily: "Pacifico",
        fontSize: "28px",
        textTransform: "none"
    }
}));

export default function ButtonYellowMediumPacifico({handleClick, buttonText, disabled}) {
    const classes = useStyles();

    return (
        <Button
            color="secondary"
            className={classes.buttonContained}
            variant="contained"
            size="small"
            disabled={disabled}
            onClick={(event) => handleClick()}
        >
            {buttonText}
        </Button>
    )
}