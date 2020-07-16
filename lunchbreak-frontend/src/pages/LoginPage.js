import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from "../context/user/UserContextProvider";
import {UserDispatchContext, UserStateContext} from "../context/user/UserContext";
import {performLogin} from "../utils/AuthUtils";
import {getDecodedJWTToken, setJWTToken} from "../utils/JWTUtils";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import InputTextField from "../components/inputFields/InputTextField";
import InputPasswordField from "../components/inputFields/InputPasswordField";
import ButtonYellowBig from "../components/buttons/ButtonYellowBig";

const useStyles = makeStyles((theme) => ({
    gridBigContainer: {
        height: "60vh",
        paddingTop: "40%",
    },
    gridContainer: {
        padding: theme.spacing(4)
    },
    buttonNonContained: {
        color: "primary",
        fontFamily: "Arimo",
        textTransform: "none",
        textAlign: "center"
    },
    nextTopic: {
        paddingTop: theme.spacing(3)
    }
}));

export default function LoginPage() {
    const classes = useStyles();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useContext(UserDispatchContext);

    function login() {
        dispatch({type: LOGIN});
        performLogin(username, password)
            .then((data) => {
                setJWTToken(data);
                const userData = getDecodedJWTToken();
                dispatch({type: LOGIN_SUCCESS, payload: userData});
            })
            .catch(() => {
                dispatch({type: LOGIN_FAILED});
            });
    }

    const {authStatus} = useContext(UserStateContext);
    if (authStatus === 'SUCCESS') {
        return <Redirect to={'/dailymatch'}/>;
    }

    return (
        <Grid container
              className={classes.gridBigContainer}
              direction="row"
              justify="center"
        >
            <Card>
                <Grid item>
                    <Grid container
                          className={classes.gridContainer}
                          direction="column"
                          alignItems="center"
                          justify="center"
                    >
                        <Grid item>
                            <Typography variant="h4" color="primary" align="center">
                                Welcome to LunchBreak
                            </Typography>
                        </Grid>
                        <Grid item className={classes.nextTopic}>
                            <InputTextField fieldName="username" label="E-Mail-Adresse" value={username}
                                            setValue={setUsername}/>
                        </Grid>
                        <Grid item>
                            <InputPasswordField fieldName="password" label="Passwort" value={password}
                                            setValue={setPassword}/>
                        </Grid>
                        <Grid item className={classes.nextTopic}>
                            <ButtonYellowBig handleClick={login} buttonText="Login"/>
                        </Grid>
                        <Grid item className={classes.nextTopic}>
                            <Button
                                className={classes.buttonNonContained}
                                color="primary"
                                href="/register">
                                Noch keinen Account? Hier geht's zur Registrierung.
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}