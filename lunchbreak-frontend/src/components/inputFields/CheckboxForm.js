import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import {initProfileDataFetch} from "../../utils/FetchUtils";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    }
}));

export default function CheckboxForm() {
    const classes = useStyles();

    const [lunchdays, setLunchdays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    })

    useEffect(() => {
        initProfileDataFetch()
            .then(data => {
                setLunchdays(data.lunchdays);
            })
    }, [])

    const {monday, tuesday, wednesday, thursday, friday} = lunchdays;

    function handleLunchdayChange(event) {
        setLunchdays({...lunchdays, [event.target.name]: event.target.checked});
    }

    function LunchdayCheckbox({checked, fieldName, label}) {
        return (
        <FormControlLabel
            control={<Checkbox checked={checked}
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
                Markiere die Tage, an denen Du grundsätzlich lunchen gehen möchtest/kannst
            </FormLabel>
            <FormGroup>
                <LunchdayCheckbox checked={monday} fieldName="monday" label="Montag"/>
                <LunchdayCheckbox checked={tuesday} fieldName="tuesday" label="Dienstag"/>
                <LunchdayCheckbox checked={wednesday} fieldName="wednesday" label="Mittwoch"/>
                <LunchdayCheckbox checked={thursday} fieldName="thursday" label="Donnerstag"/>
                <LunchdayCheckbox checked={friday} fieldName="tuesday" label="Freitag"/>
            </FormGroup>
        </FormControl>
    )
}