import React, {useContext, useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Form, Formik} from "formik";
import {performRegistration} from "../../utils/AuthUtils";
import * as Yup from "yup";
import InputTextFieldValidated from "../inputFields/InputTextFieldValidated";
import ButtonYellowBig from "../buttons/ButtonYellowBig";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from "react-router";
import {REGISTRATION, REGISTRATION_SUCCESS} from "../../context/user/UserContextProvider";
import {UserDispatchContext, UserStateContext} from "../../context/user/UserContext";
import PopupRegistrationSuccess from "../popups/PopupRegistrationSuccess";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(3)
    }
}));

export default function RegistrationForm() {
    const classes = useStyles();

    const history = useHistory();

    const dispatch = useContext(UserDispatchContext);

    function register(userInput) {
        dispatch({type: REGISTRATION});
        performRegistration(userInput)
            .then(data => {
                dispatch({type: REGISTRATION_SUCCESS, payload: data});
            })
    }

    const {registrationStatus} = useContext(UserStateContext);

    function cancel() {
        history.push = "/login";
    }

    return (
        <>
            <Grid item>
                <Typography variant="h4" color="primary" align="center">
                    Registrierung
                </Typography>
            </Grid>
            <Formik initialValues={
                {
                    firstName: '',
                    lastName: '',
                    username: '',
                    password: '',
                    matchingPassword: ''
                }}
                    onSubmit={(values) => register(values)}

                    validationSchema={Yup.object().shape({
                        firstName: Yup.string()
                            .required("Pflichtfeld"),
                        lastName: Yup.string()
                            .required("Pflichtfeld"),
                        username: Yup.string()
                            .required("Pflichtfeld")
                            .email("Keine valide E-Mail-Adresse"),
                        password: Yup.string()
                            .required("Pflichtfeld")
                            .min(8, "Min. 8 Zeichen")
                            .matches(
                                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])/,
                                "Min. ein Groß- sowie Kleinbuchstabe und min. eine Zahl"),
                        matchingPassword: Yup.string()
                            .required("Pflichtfeld")
                            .oneOf([Yup.ref("password"), null], "Passwörter stimmen nicht überein")
                    })}
            >
                {props => {
                    return (
                        <Form>
                            <Grid item className={classes.nextTopic}>
                                <InputTextFieldValidated fieldType="text" fieldName="firstName"
                                                         label="Vorname" formikProps={props}/>
                            </Grid>
                            <Grid item>
                                <InputTextFieldValidated fieldType="text" fieldName="lastName"
                                                         label="Nachname" formikProps={props}/>
                            </Grid>
                            <Grid item>
                                <InputTextFieldValidated fieldType="text" fieldName="username"
                                                         label="E-Mail-Adresse" formikProps={props}/>
                            </Grid>
                            <Grid item>
                                <InputTextFieldValidated fieldType="password" fieldName="password"
                                                         label="Passwort" formikProps={props}/>
                            </Grid>
                            <Grid item>
                                <InputTextFieldValidated fieldType="password" fieldName="matchingPassword"
                                                         label="Passwort wiederholen" formikProps={props}/>
                            </Grid>
                            <Grid container
                                  direction="row"
                                  justify="space-between">
                                <Grid item className={classes.nextTopic}>
                                    <ButtonYellowBig handleClick={props.handleSubmit}
                                                     buttonText="Account erstellen"/>
                                </Grid>
                                <Grid item className={classes.nextTopic}>
                                    <ButtonYellowBig handleClick={cancel} buttonText="Abbrechen"/>
                                </Grid>
                            </Grid>
                        </Form>
                    )
                }}
            </Formik>
            <PopupRegistrationSuccess openStatus={registrationStatus === 'SUCCESS'}/>
        </>
    )
}