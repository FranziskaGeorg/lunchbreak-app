import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import React, {useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    }
}));

export default function LunchdayCheckboxes() {
    const classes = useStyles();

    const [lunchdays, setLunchdays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    })

    const {monday, tuesday, wednesday, thursday, friday} = lunchdays;

    function handleLunchdayChange(event) {
        setLunchdays({...lunchdays, [event.target.name]: event.target.checked});
    }

    return (
        <FormControl component="fieldset">
            <FormLabel
                component="legend"
                className={classes.nextTopic}>
                Markiere die Tage, an denen Du grundsätzlich lunchen gehen möchtest/kannst
            </FormLabel>
            <FormGroup>
                <FormControlLabel
                    control={<Checkbox checked={monday}
                                       onChange={handleLunchdayChange}
                                       name="monday"/>}
                    label="Montag"
                />
                <FormControlLabel
                    control={<Checkbox checked={tuesday}
                                       onChange={handleLunchdayChange}
                                       name="tuesday"/>}
                    label="Dienstag"
                />
                <FormControlLabel
                    control={<Checkbox checked={wednesday}
                                       onChange={handleLunchdayChange}
                                       name="wednesday"/>}
                    label="Mittwoch"
                />
                <FormControlLabel
                    control={<Checkbox checked={thursday}
                                       onChange={handleLunchdayChange}
                                       name="thursday"/>}
                    label="Donnerstag"
                />
                <FormControlLabel
                    control={<Checkbox checked={friday}
                                       onChange={handleLunchdayChange}
                                       name="friday"/>}
                    label="Freitag"
                />
            </FormGroup>
        </FormControl>
    )
}
