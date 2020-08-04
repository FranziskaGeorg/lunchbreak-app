import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    }
}));

export default function CheckboxForm({lunchdays, setLunchdays}) {
    const classes = useStyles();

    function handleLunchdayChange(event) {
        setLunchdays({...lunchdays, [event.target.name]: event.target.checked});
    }

    function LunchdayCheckbox({checked, fieldName, label}) {
        return (
            <FormControlLabel
                control={<Checkbox checked={checked}
                                   color="primary"
                                   onChange={handleLunchdayChange}
                                   name={fieldName}/>}
                label={label}
            />
        )
    }

    return (
        <FormControl component="fieldset">
            <FormLabel
                component="legend"
                className={classes.nextTopic}>
                Markiere die Tage, an denen Du lunchen gehen möchtest/kannst
            </FormLabel>
            <FormGroup>
                <LunchdayCheckbox checked={lunchdays.monday} fieldName="monday" label="Montag"/>
                <LunchdayCheckbox checked={lunchdays.tuesday} fieldName="tuesday" label="Dienstag"/>
                <LunchdayCheckbox checked={lunchdays.wednesday} fieldName="wednesday" label="Mittwoch"/>
                <LunchdayCheckbox checked={lunchdays.thursday} fieldName="thursday" label="Donnerstag"/>
                <LunchdayCheckbox checked={lunchdays.friday} fieldName="friday" label="Freitag"/>
            </FormGroup>
        </FormControl>
    )
}