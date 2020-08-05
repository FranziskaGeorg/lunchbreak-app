import React from "react";
import Box from "@material-ui/core/Box";
import InputTextFieldValidated from "../inputFields/InputTextFieldValidated";
import ButtonYellow from "../buttons/ButtonYellow";
import Button from "@material-ui/core/Button";
import {Form} from "formik";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    actionButtonTurquoise: {
        color: "primary",
        fontFamily: "Arimo",
        textTransform: "none"
    },
    nextTopicAndCenterItem: {
        paddingTop: theme.spacing(3),
        textAlign: "center"
    }
}));

export default function LoginFormFields({formikProps}) {
    const classes = useStyles();

    function goToRegistration() {
        window.location.href = "/register";
    }

    return (
        <Form>
            <Box className={classes.nextTopicAndCenterItem}>
                <InputTextFieldValidated fieldType="text" fieldName="username"
                                         label="E-Mail-Adresse" formikProps={formikProps}/>
                <InputTextFieldValidated fieldType="password" fieldName="password"
                                         label="Passwort" formikProps={formikProps}/>
            </Box>
            <Box className={classes.nextTopicAndCenterItem}>
                <ButtonYellow handleClick={formikProps.handleSubmit}
                              buttonSize="large"
                              buttonText="Login"/>
            </Box>
            <Box className={classes.nextTopicAndCenterItem}>
                <Button
                    className={classes.actionButtonTurquoise}
                    color="primary"
                    onClick={goToRegistration}>
                    Noch keinen Account? Hier geht's zur Registrierung.
                </Button>
            </Box>
        </Form>
    )
}