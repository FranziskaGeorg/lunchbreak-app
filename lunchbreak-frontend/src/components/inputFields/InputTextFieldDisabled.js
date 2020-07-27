import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    inputField: {
        backgroundColor: "#eef5f6",
        '@media (max-width: 599px)': {
            width: "75vw"
        },
        '@media (min-width:600px)': {
            width: "50vw"
        },
        '@media (min-width:960px)': {
            width: "25vw"
        }
    },
    notchedOutline: {
        borderColor: "#eef5f6 !important",
    },
}));

export default function InputTextFieldDisabled({fieldName, label, value, setValue}) {
    const classes = useStyles();

    return (
        <TextField
            disabled
            margin="dense"
            className={classes.inputField}
            InputProps={{
                classes: {
                    notchedOutline: classes.notchedOutline
                }
            }}
            variant="outlined"
            name={fieldName}
            label={label}
            value={value}
            onChange={(event) => setValue(event.target.value)}
        />
    )
}