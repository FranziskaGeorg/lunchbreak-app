import React from "react";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    buttonContained: {
        color: "#575757",
        //color: "#dfa528",
        fontFamily: "Arimo",
        textTransform: "none"
    }
}));

export default function ButtonGrey({handleClick, buttonText, buttonSize, icon}) {
    const classes = useStyles();

    return (
        <Button
            className={classes.buttonContained}
            size={buttonSize}
            onClick={(event) => handleClick()}
            startIcon={icon}>
            {buttonText}
        </Button>
    )
}