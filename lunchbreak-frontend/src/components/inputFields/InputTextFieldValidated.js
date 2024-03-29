import React from "react";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    inputField: {
        backgroundColor: "#eef5f6",
        '@media (max-width: 599px)': {
            width: "75vw"
        },
        '@media (min-width: 600px)': {
            width: "50vw",
            maxWidth: "100%",
            minWidth: "500px"
        }
    },
    notchedOutline: {
        borderColor: "#eef5f6 !important",
    }
}));

export default function InputTextFieldValidated({fieldType, fieldName, label, formikProps}) {
    const classes = useStyles();

    return (
        <>
        <TextField
            required
            type={fieldType}
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
            value={formikProps.values[fieldName]}
            onChange={formikProps.handleChange}
            onBlur={formikProps.handleBlur}
        />
    {formikProps.errors[fieldName] && formikProps.touched[fieldName] && (
        <Typography variant="caption">{formikProps.errors[fieldName]}</Typography>
    )}
    </>
    )
}