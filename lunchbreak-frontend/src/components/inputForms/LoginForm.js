import React, {useContext, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {Formik} from "formik";
import * as Yup from "yup";
import {UserDispatchContext, UserStateContext} from "../../context/user/UserContext";
import {LOGIN, LOGIN_FAILED, LOGIN_SUCCESS} from "../../context/user/UserContextProvider";
import {performLogin} from "../../utils/AuthUtils";
import {getDecodedJWTToken, setJWTToken} from "../../utils/JWTUtils";
import {Redirect} from "react-router-dom";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import startLogo from '../../images/happytoast_startlogo.png';
import SnackbarLoginFailed from "../popups/SnackbarLoginFailed";
import LoginFormFields from "./LoginFormFields";

const useStyles = makeStyles((theme) => ({
    loginBox: {
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

export default function LoginForm() {
    const classes = useStyles();

    const dispatch = useContext(UserDispatchContext);

    const [showSnackbar, setShowSnackbar] = useState(false);

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
                setShowSnackbar(true);
            });
    }

    const {authStatus} = useContext(UserStateContext);
    if (authStatus === 'SUCCESS') {
        return <Redirect to={'/dailymatch'}/>;
    }

    return (
        <Box className={classes.loginBox}>
            <Box>
                <Typography variant="h4" color="primary" align="center">
                    Welcome to LunchBreak
                </Typography>
            </Box>
            <Box className={classes.logoPlacement}>
                <img src={startLogo} alt="Lunchbreak logo for login" className={classes.logo}/>
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
                    })}>
                {props => {
                    return <LoginFormFields formikProps={props}/>
                }}
            </Formik>
            <SnackbarLoginFailed showSnackbar={showSnackbar} setShowSnackbar={setShowSnackbar}/>
        </Box>
    )
}