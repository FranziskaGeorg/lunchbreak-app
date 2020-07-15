import React, {useReducer, useState} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {performRegistration} from "../utils/AuthUtils";
import InputPasswordField from "../components/inputFields/InputPasswordField";
import InputTextField from "../components/inputFields/InputTextField";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(4)
    },
}));

export default function RegistrationPage() {
    const classes = useStyles();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [matchingPassword, setMatchingPassword] = useState('');

    function handleRegistrationClick() {
        const userInput = {firstName, lastName, username, password, matchingPassword};
        performRegistration(userInput)
            .then(data => console.log(data));
    }

    return (
        <Grid container
              className={classes.gridContainer}
              direction="column"
              alignContent="center"
              justify="center"
              spacing={5}
        >
            <Grid item>
                <Typography variant="h4">
                    Registrierung
                </Typography>
            </Grid>
            <Grid item>
                <Grid container
                      direction="column"
                      alignContent="center"
                      justify="center"
                      spacing={2}
                >
                    <Grid item>
                        <InputTextField fieldName="firstName" label="Vorname" value={firstName}
                                        setValue={setFirstName}/>
                    </Grid>
                    <Grid item>
                        <InputTextField fieldName="lastName" label="Nachname" value={lastName} setValue={setLastName}/>
                    </Grid>
                    <Grid item>
                        <InputTextField fieldName="username" label="E-Mail-Adresse" value={username}
                                        setValue={setUsername}/>
                    </Grid>
                    <Grid item>
                        <InputPasswordField fieldName="password" label="Passwort" value={password}
                                            setValue={setPassword}/>
                    </Grid>
                    <Grid item>
                        <InputPasswordField fieldName="matchingPassword" label="Passwort wiederholen"
                                            value={matchingPassword} setValue={setMatchingPassword}/>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={handleRegistrationClick}
                        >
                            Account erstellen
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            href="/login"
                        >
                            Abbrechen
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}