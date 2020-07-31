import React, {useContext} from "react";
import Typography from "@material-ui/core/Typography";
import {Form, Formik} from "formik";
import {performRegistration} from "../../utils/AuthUtils";
import * as Yup from "yup";
import InputTextFieldValidated from "../inputFields/InputTextFieldValidated";
import ButtonYellow from "../buttons/ButtonYellow";
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
import helloLogo from '../../images/happytoast_hello.png';
import PopupRegistrationFailed from "../popups/PopupRegistrationFailed";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(3)
    },
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
    },
    registrationBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        '@media (min-width: 412px, max-width: 599px)': {
            minWidth: "400px"
        },
        '@media (min-width:600px)': {
            maxWidth: "500px"
        }
    },
    logo: {
        width: '60%',
        height: '60%'
    },
    logoPlacement: {
        paddingTop: theme.spacing(3),
        textAlign: "center"
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
        <Box className={classes.registrationBox}>
            <Box>
                <Typography variant="h4" color="primary" align="center">
                    Registrierung
                </Typography>
            </Box>
            <Box className={classes.logoPlacement}>
                <img src={helloLogo} alt="Lunchbreak logo for registration" className={classes.logo}/>
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
                            <Box className={classes.nextTopicAndCenterItem}>
                                <InputTextFieldValidated fieldType="text" fieldName="firstName"
                                                         label="Vorname" formikProps={props}/>
                            </Box>
                            <Box className={classes.centerItem}>
                                <InputTextFieldValidated fieldType="text" fieldName="lastName"
                                                         label="Nachname" formikProps={props}/>
                            </Box>
                            <Box className={classes.centerItem}>
                                <InputTextFieldValidated fieldType="text" fieldName="username"
                                                         label="E-Mail-Adresse" formikProps={props}/>
                            </Box>
                            <Box className={classes.centerItem}>
                                <InputTextFieldValidated fieldType="password" fieldName="password"
                                                         label="Passwort" formikProps={props}/>
                            </Box>
                            <Box className={classes.centerItem}>
                                <InputTextFieldValidated fieldType="password" fieldName="matchingPassword"
                                                         label="Passwort wiederholen" formikProps={props}/>
                            </Box>
                            <Box className={classes.buttonBox}>
                                <ButtonYellow handleClick={() => history.push("/login")}
                                              buttonSize="medium"
                                              buttonText="Abbrechen"
                                />
                                <ButtonYellow handleClick={props.handleSubmit}
                                              buttonSize="medium"
                                              buttonText="Account erstellen"
                                />
                            </Box>
                        </Form>
                    )
                }}
            </Formik>
            <PopupRegistrationSuccess openStatus={registrationStatus === 'SUCCESS'}/>
            <PopupRegistrationFailed openStatus={registrationStatus === 'FAILED'}/>
        </Box>
    )
}