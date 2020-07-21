import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
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

export default function DropdownField({subsidiary, setSubsidiary}) {
    const classes = useStyles();

    const subsidiaries = [
        {
            value: "Technologies"
        },
        {
            value: "Business Consultants"
        },
        {
            value: "Communications"
        },
        {
            value: "Development & Integration"
        },
        {
            value: "Services"
        },
        {
            value: "Solutions"
        },
        {
            value: "Babiel"
        },
        {
            value: "PROCON IT"
        }
    ]

    function handleSubsidiaryChange(event) {
        setSubsidiary(event.target.value);
    }

    return (
        <TextField
            required
            select
            margin="dense"
            className={classes.inputField}
            InputProps={{
                classes: {
                    notchedOutline: classes.notchedOutline
                }
            }}
            id="outlined-select"
            variant="outlined"
            name="subsidiary"
            label="CONET-Gesellschaft"
            value={subsidiary}
            onChange={handleSubsidiaryChange}
        >
            {subsidiaries.map(subsidiary => (
                <MenuItem value={subsidiary.value}>
                    {subsidiary.value}
                </MenuItem>
            ))}
        </TextField>
    )
}