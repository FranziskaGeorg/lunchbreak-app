import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import {Form, Formik} from "formik";
import {performRegistration} from "../../utils/AuthUtils";
import * as Yup from "yup";
import InputTextFieldValidated from "../inputFields/InputTextFieldValidated";
import ButtonYellowBig from "../buttons/ButtonYellowBig";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useHistory} from "react-router";
import {
    REGISTRATION,
    REGISTRATION_FAILED,
    REGISTRATION_SUCCESS
} from "../../context/user/UserContextProvider";
import {UserDispatchContext, UserStateContext} from "../../context/user/UserContext";
import PopupRegistrationSuccess from "../popups/PopupRegistrationSuccess";
import Box from "@material-ui/core/Box";
import ButtonYellowMediumPacifico from "../buttons/ButtonYellowMediumPacifico";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(3)
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        paddingTop: theme.spacing(2),
        justifyContent: "space-between"
    }
}));

export default function RegistrationForm() {
    const classes = useStyles();

    const history = useHistory();

    const dispatch = useContext(UserDispatchContext);

    const {registrationStatus} = useContext(UserStateContext);

    function register(userInput) {
        dispatch({type: REGISTRATION});
        performRegistration(userInput)
            .then(data => {
                dispatch({type: REGISTRATION_SUCCESS, payload: data});
            })
            .catch(() => {
                dispatch({type: REGISTRATION_FAILED});
            });
    }

    return (
        <Box>
            <Box>
                <Typography variant="h4" color="primary" align="center">
                    Registrierung
                </Typography>
            </Box>
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
                            .required("Pflichtfeld")
                            .min(2, "Min. 2 Zeichen"),
                        lastName: Yup.string()
                            .required("Pflichtfeld")
                            .min(2, "Min. 2 Zeichen"),
                        username: Yup.string()
                            .required("Pflichtfeld")
                            .email("Keine valide E-Mail-Adresse"),
                        password: Yup.string()
                            .required("Pflichtfeld")
                            .min(8, "Min. 8 Zeichen")
                            .max(15, "Max. 15 Zeichen")
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
                            <Box className={classes.nextTopic}>
                                <InputTextFieldValidated fieldType="text" fieldName="firstName"
                                                         label="Vorname" formikProps={props}/>
                            </Box>
                            <Box>
                                <InputTextFieldValidated fieldType="text" fieldName="lastName"
                                                         label="Nachname" formikProps={props}/>
                            </Box>
                            <Box>
                                <InputTextFieldValidated fieldType="text" fieldName="username"
                                                         label="E-Mail-Adresse" formikProps={props}/>
                            </Box>
                            <Box>
                                <InputTextFieldValidated fieldType="password" fieldName="password"
                                                         label="Passwort" formikProps={props}/>
                            </Box>
                            <Box>
                                <InputTextFieldValidated fieldType="password" fieldName="matchingPassword"
                                                         label="Passwort wiederholen" formikProps={props}/>
                            </Box>
                            <Box className={classes.buttonBox}>
                                <ButtonYellowBig handleClick={() => history.push("/login")}
                                                 buttonSize="medium"
                                                 buttonText="Abbrechen"
                                />
                                <ButtonYellowBig handleClick={props.handleSubmit}
                                                 buttonSize="medium"
                                                 buttonText="Account erstellen"
                                />
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
            <PopupRegistrationSuccess openStatus={registrationStatus === 'SUCCESS'}/>
        </Box>
    )
}