import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import React, {useContext} from "react";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from "../context/user/UserContextProvider";
import {UserDispatchContext, UserStateContext} from "../context/user/UserContext";
import {performLogin} from "../utils/AuthUtils";
import {getDecodedJWTToken, setJWTToken} from "../utils/JWTUtils";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ButtonYellowBig from "../components/buttons/ButtonYellowBig";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputTextFieldValidated from "../components/inputFields/InputTextFieldValidated";

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

    const dispatch = useContext(UserDispatchContext);

    function login(username, password) {
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

    function goToRegistration() {
        window.location.href = "/register";
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
                          alignContent="center"
                          justify="center"
                    >
                        <Grid item>
                            <Typography variant="h4" color="primary" align="center">
                                Welcome to LunchBreak
                            </Typography>

                            <Formik initialValues={
                                {
                                    username: '',
                                    password: ''
                                }}
                                    onSubmit={(values) => {
                                        login(values.username, values.password);
                                        console.log(values);
                                    }}

                                    validationSchema={Yup.object().shape({
                                        username: Yup.string()
                                            .required("Pflichtfeld")
                                            .email("Keine valide E-Mail-Adresse"),
                                        password: Yup.string()
                                            .required("Pflichtfeld")
                                    })}
                            >
                                {props => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit
                                    } = props;
                                    return (
                                        <Form>
                                            <Grid item className={classes.nextTopic}>
                                                <InputTextFieldValidated fieldType="text" fieldName="username"
                                                                         label="E-Mail-Adresse" formikProps={props}/>
                                            </Grid>
                                            <Grid item>
                                                <InputTextFieldValidated fieldType="password" fieldName="password"
                                                                         label="Passwort" formikProps={props}/>
                                            </Grid>
                                                <Grid item className={classes.nextTopic}>
                                                    <ButtonYellowBig handleClick={props.handleSubmit}
                                                                     buttonText="Login"/>
                                                </Grid>
                                            <Grid item className={classes.nextTopic}>
                                                <Button
                                                    className={classes.buttonNonContained}
                                                    color="primary"
                                                    onClick={goToRegistration}>
                                                    Noch keinen Account? Hier geht's zur Registrierung.
                                                </Button>
                                            </Grid>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}


