import React from "react";
import Box from "@material-ui/core/Box";
import InputTextFieldValidated from "../inputFields/InputTextFieldValidated";
import ButtonYellow from "../buttons/ButtonYellow";
import {Form} from "formik";
import {useHistory} from "react-router";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    centerItem: {
        textAlign: "center"
    },
    nextTopicAndCenterItem: {
        paddingTop: theme.spacing(3),
        textAlign: "center"
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        paddingTop: theme.spacing(2),
        justifyContent: "space-around"
    }
}));

export default function RegistrationFormFields({formikProps}) {
    const classes = useStyles();

    const history = useHistory();

    return (
        <Form>
            <Box className={classes.nextTopicAndCenterItem}>
                <InputTextFieldValidated fieldType="text" fieldName="firstName"
                                         label="Vorname" formikProps={formikProps}/>
            </Box>
            <Box className={classes.centerItem}>
                <InputTextFieldValidated fieldType="text" fieldName="lastName"
                                         label="Nachname" formikProps={formikProps}/>
            </Box>
            <Box className={classes.centerItem}>
                <InputTextFieldValidated fieldType="text" fieldName="username"
                                         label="E-Mail-Adresse" formikProps={formikProps}/>
            </Box>
            <Box className={classes.centerItem}>
                <InputTextFieldValidated fieldType="password" fieldName="password"
                                         label="Passwort" formikProps={formikProps}/>
            </Box>
            <Box className={classes.centerItem}>
                <InputTextFieldValidated fieldType="password" fieldName="matchingPassword"
                                         label="Passwort wiederholen" formikProps={formikProps}/>
            </Box>
            <Box className={classes.buttonBox}>
                <ButtonYellow handleClick={() => history.push("/login")}
                              buttonSize="medium"
                              buttonText="Abbrechen"/>
                <ButtonYellow handleClick={formikProps.handleSubmit}
                              buttonSize="medium"
                              buttonText="Account erstellen"/>
            </Box>
        </Form>
    )
}