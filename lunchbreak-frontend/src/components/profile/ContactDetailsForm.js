import React from "react";
import Grid from "@material-ui/core/Grid";
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

export default function ContactDetailsForm({handleInputChange, profileInput}) {
    const classes = useStyles();

    return (
        <>
            <Grid item>
                <TextField
                    required
                    margin="dense"
                    className={classes.inputField}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                    id="outlined-required"
                    variant="outlined"
                    name="email"
                    label="E-Mail-Adresse"
                    value={profileInput.email}
                    onChange={handleInputChange}
                />
            </Grid>
            <Grid item>
                <TextField
                    required
                    margin="dense"
                    className={classes.inputField}
                    InputProps={{
                        classes: {
                            notchedOutline: classes.notchedOutline
                        }
                    }}
                    id="outlined-required"
                    variant="outlined"
                    name="phoneNumber"
                    label="Handynummer"
                    value={profileInput.phoneNumber}
                    onChange={handleInputChange}
                />
            </Grid>
        </>
    )
}