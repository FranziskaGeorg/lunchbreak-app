import React, {useReducer} from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {performRegistration} from "../utils/AuthUtils";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(4)
    },
}));

export default function RegistrationPage() {
    const classes = useStyles();
    const [userInput, setUserInput] = useReducer(
        (state, newState) => ({...state, ...newState}),
        {
            firstName: '',
            lastName: '',
            username: '',
            password: '',
            matchingPassword: ''
        }
    )

    function handleInputChange(event) {
        const field = event.target.name;
        const value = event.target.value;
        setUserInput({[field]: value});
    }

    function handleRegistrationClick() {
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
                        <TextField
                            required
                            id="filled-required"
                            name="firstName"
                            label="Vorname"
                            variant="filled"
                            value={userInput.firstName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            name="lastName"
                            label="Nachname"
                            variant="filled"
                            value={userInput.lastName}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            name="username"
                            label="E-Mail-Adresse"
                            variant="filled"
                            value={userInput.username}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            name="password"
                            label="Passwort"
                            type="password"
                            variant="filled"
                            value={userInput.password}
                            onChange={handleInputChange}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            name="matchingPassword"
                            label="Passwort wiederholen"
                            type="password"
                            variant="filled"
                            value={userInput.matchingPassword}
                            onChange={handleInputChange}
                        />
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