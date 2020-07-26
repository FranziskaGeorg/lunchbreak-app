import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputTextFieldValidated from "../inputFields/InputTextFieldValidated";
import ButtonYellowBig from "../buttons/ButtonYellowBig";
import Button from "@material-ui/core/Button";
import {UserDispatchContext, UserStateContext} from "../../context/user/UserContext";
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from "../../context/user/UserContextProvider";
import {performLogin} from "../../utils/AuthUtils";
import {getDecodedJWTToken, setJWTToken} from "../../utils/JWTUtils";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    buttonNonContained: {
        color: "primary",
        fontFamily: "Arimo",
        textTransform: "none"
    },
    nextTopic: {
        paddingTop: theme.spacing(3)
    },
    nextTopicAndCenterItem: {
        paddingTop: theme.spacing(3),
        textAlign: "center"
    },
    loginBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        '@media (min-width: 412px, max-width: 599px)': {
            minWidth: "400px"
        },
        '@media (min-width:600px)': {
            maxWidth: "600px"
        }
    }
}));

export default function LoginForm() {
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
        <Box className={classes.loginBox}>
            <Box>
                <Typography variant="h4" color="primary" align="center">
                    Welcome to LunchBreak
                </Typography>
            </Box>
            <Formik initialValues={
                {
                    username: '',
                    password: ''
                }}
                    onSubmit={(values) => login(values.username, values.password)}

                    validationSchema={Yup.object().shape({
                        username: Yup.string()
                            .required("Pflichtfeld")
                            .email("Keine valide E-Mail-Adresse"),
                        password: Yup.string()
                            .required("Pflichtfeld")
                    })}
            >
                {props => {
                    return (
                        <Form>
                            <Box className={classes.nextTopicAndCenterItem}>
                                <InputTextFieldValidated fieldType="text" fieldName="username"
                                                         label="E-Mail-Adresse" formikProps={props}/>
                                <InputTextFieldValidated fieldType="password" fieldName="password"
                                                         label="Passwort" formikProps={props}/>
                            </Box>
                            <Box className={classes.nextTopicAndCenterItem}>
                                <ButtonYellowBig handleClick={props.handleSubmit}
                                                 buttonSize="large"
                                                 buttonText="Login"/>
                            </Box>
                            <Box className={classes.nextTopicAndCenterItem}>
                                <Button
                                    className={classes.buttonNonContained}
                                    color="primary"
                                    onClick={goToRegistration}>
                                    Noch keinen Account? Hier geht's zur Registrierung.
                                </Button>
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
        </Box>
    )
}