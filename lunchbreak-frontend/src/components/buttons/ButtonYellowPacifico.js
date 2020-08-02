import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonContained: {
        color: "#ffffff",
        fontFamily: "Pacifico",
        fontSize: "24px",
        textTransform: "none",
        borderRadius: "30px",
        boxShadow: "0px 1px 3px 0px #9F9682"
    }
}));

export default function ButtonYellowPacifico({handleClick, buttonText, disabled}) {
    const classes = useStyles();

    return (
        <Button
            color="secondary"
            className={classes.buttonContained}
            variant="contained"
            size="medium"
            disabled={disabled}
            onClick={(event) => handleClick()}
        >
            {buttonText}
        </Button>
    )
}