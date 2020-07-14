import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputTextField from "./InputTextField";
import DropdownField from "./DropdownField";
import CheckboxForm from "./CheckboxForm";
import Typography from "@material-ui/core/Typography";

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
    }
}));

export default function ProfileForm({handleInputChange, profileInput}) {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [job, setJob] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

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
                <InputTextField fieldName="email" label="E-Mail-Adresse" value={email} setValue={setEmail}/>
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
        </>
    )
}