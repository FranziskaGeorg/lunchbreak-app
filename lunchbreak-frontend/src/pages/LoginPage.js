import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useContext, useState} from "react";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from "../context/user/UserContextProvider";
import {UserDispatchContext, UserStateContext} from "../context/user/UserContext";
import {performLogin} from "../utils/AuthUtils";
import {getDecodedJWTToken, setJWTToken} from "../utils/JWTUtils";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(4)
    },
}));

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useContext(UserDispatchContext);

    const classes = useStyles();

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
              className={classes.gridContainer}
              direction="column"
              alignContent="center"
              justify="center"
              spacing={2}
        >
            <Grid item>
                <div>
                    <TextField
                        label="E-Mail-Adresse"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    onClick={login}>
                    Login
                </Button>
            </Grid>
            <Grid item>
                <Button
                    variant="contained"
                    href="/register">
                    Noch keinen Account? Hier geht's zur Registrierung.
                </Button>
            </Grid>
        </Grid>
    );
}