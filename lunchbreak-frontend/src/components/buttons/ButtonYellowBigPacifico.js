import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonContained: {
        backgroundColor: "#dfa528",
        color: "#ffffff",
        fontFamily: "Pacifico",
        fontSize: "28px",
        textTransform: "none"
    }
}));

export default function ButtonYellowBigPacifico({handleClick, buttonText, disabled}) {
    const classes = useStyles();

    return (
        <Button
            className={classes.buttonContained}
            variant="contained"
            size="large"
            disabled={disabled}
            onClick={(event) => handleClick()}
        >
            {buttonText}
        </Button>
    )
}