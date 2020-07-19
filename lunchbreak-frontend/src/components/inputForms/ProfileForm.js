import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputTextField from "../inputFields/InputTextField";
import DropdownField from "../inputFields/DropdownField";
import CheckboxForm from "../inputFields/CheckboxForm";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {initProfileDataFetch, saveProfileDataFetch} from "../../utils/FetchUtils";

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
    nextTopic: {
        paddingTop: theme.spacing(2)
    },
    button: {
        backgroundColor: "#dfa528",
        color: "#ffffff",
        fontFamily: "Arimo",
        fontWeight: "bold",
        textTransform: "none",
        marginRight: theme.spacing(2)
    }
}));

export default function ProfileForm() {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [job, setJob] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [lunchdays, setLunchdays] = useState('');

    const profileInput = {firstName, lastName, job, favoriteFood, hobbies, username, phoneNumber, lunchdays}

    useEffect(() => {
        initProfileDataFetch()
            .then(data => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setUsername(data.username);
                setLunchdays("placeholder");
            })
    }, [])

    function handleSave() {
        saveProfileDataFetch(profileInput)
            .then(data => console.log(data));
    }

    return (
        <>
            <Grid item>
                <Typography variant="h5">
                    Über Dich
                </Typography>
            </Grid>
            <Grid item>
                <InputTextField fieldName="firstName" label="Vorname" value={firstName} setValue={setFirstName}/>
            </Grid>
            <Grid item>
                <InputTextField fieldName="lastName" label="Nachname" value={lastName} setValue={setLastName}/>
            </Grid>
            <Grid item>
                <InputTextField fieldName="job" label="Tätigkeit bei CONET" value={job} setValue={setJob}/>
            </Grid>
            <Grid item>
                <DropdownField/>
            </Grid>
            <Grid item>
                <InputTextField fieldName="favoriteFood" label="Lieblingsessen bzw. -essensrichtung"
                                value={favoriteFood} setValue={setFavoriteFood}/>
            </Grid>
            <Grid item>
                <InputTextField fieldName="hobbies" label="Hobbies oder Interessen" value={hobbies}
                                setValue={setHobbies}/>
            </Grid>
            <Grid item className={classes.nextTopic}>
                <Typography variant="h5">
                    Kontaktdaten
                </Typography>
            </Grid>
            <Grid item>
                <InputTextField fieldName="username" label="E-Mail-Adresse" value={username} setValue={setUsername}/>
            </Grid>
            <Grid item>
                <InputTextField fieldName="phoneNumber" label="Handynummer" value={phoneNumber}
                                setValue={setPhoneNumber}/>
            </Grid>
            <Grid item className={classes.nextTopic}>
                <Typography variant="h5">
                    Deine Lunchdays
                </Typography>
            </Grid>
            <Grid item>
                <CheckboxForm/>
            </Grid>
            <Grid item className={classes.nextTopic}>
                <Button
                    className={classes.button}
                    variant="contained"
                    size="large"
                >
                    Verwerfen
                </Button>
                <Button
                    className={classes.button}
                    onClick={handleSave}
                    variant="contained"
                    size="large"
                >
                    Speichern
                </Button>
            </Grid>
        </>
    )
}