import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {performRegistration} from "../utils/AuthUtils";
import Card from "@material-ui/core/Card";
import ButtonYellowBig from "../components/buttons/ButtonYellowBig";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import InputTextFieldValidated from "../components/inputFields/InputTextFieldValidated";

const useStyles = makeStyles((theme) => ({
    gridBigContainer: {
        height: "80vh",
        paddingTop: "30%"
    },
    gridContainer: {
        padding: theme.spacing(4)
    },
    nextTopic: {
        paddingTop: theme.spacing(3)
    }
}));

export default function RegistrationPage() {
    const classes = useStyles();

    function cancel() {
        window.location.href = "/login";
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
                                onSubmit={(values) => {
                                    performRegistration(values)
                                        .then(data => console.log(data));
                                }}

                                validationSchema={Yup.object().shape({
                                    firstName: Yup.string()
                                        .required("Pflichtfeld")
                                        .min(8, "Min. 8 Zeichen"),
                                    lastName: Yup.string()
                                        .required("Pflichtfeld")
                                        .min(8, "Min. 8 Zeichen"),
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
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}
