import React from "react";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(4)
    },
}));

export default function RegistrationPage() {
    const classes = useStyles();

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
                            label="Vorname"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            label="Nachname"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            label="Nutzername"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            label="E-Mail-Adresse"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            label="Passwort"
                            type="password"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            id="filled-required"
                            label="Passwort wiederholen"
                            type="password"
                            variant="filled"
                        />
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained">
                            Account erstellen
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            href="/login">
                            Abbrechen
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}