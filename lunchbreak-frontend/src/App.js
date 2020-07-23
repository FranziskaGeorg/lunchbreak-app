import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserContextProvider, {LOGIN_FAILED, LOGIN_SUCCESS} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import {UserDispatchContext} from "./context/user/UserContext";
import {getDecodedJWTToken, isJWTTokenValid} from "./utils/JWTUtils";
import DailyMatch from "./pages/DailyMatch";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/navigation/Header";
import LunchBreakTheme from "./theme/LunchBreakTheme";
import {ThemeProvider} from '@material-ui/styles';
import Container from "@material-ui/core/Container";
import BottomNavBar from "./components/navigation/BottomNavBar";
import RegistrationPage from "./pages/RegistrationPage";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    overallContainer: {
        background: "linear-gradient(0deg, rgba(238,245,246,1) 0%, rgba(149,208,197,1) 90%, rgba(0,159,149,1) 100%)",
        height: "100vh",
        paddingTop: "20%"
    }
}));

function Navigation() {
    const classes = useStyles();

    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({type: LOGIN_SUCCESS, payload: getDecodedJWTToken()});
        } else {
            dispatch({type: LOGIN_FAILED})
        }
    }, [dispatch]);

    return <BrowserRouter>
        <Header/>
        <Container className={classes.overallContainer} maxWidth={'md'} component="main">
            <Switch>
                <Route path="/login" component={LoginPage} exact/>
                <Route path="/register" component={RegistrationPage} exact/>
                <PrivateRoute path="/dailymatch" component={DailyMatch} exact/>
                <PrivateRoute path="/profile" component={ProfilePage} exact/>
            </Switch>
        </Container>
        <BottomNavBar/>
    </BrowserRouter>
}

export default function App() {
    return (
        <ThemeProvider theme={LunchBreakTheme}>
            <UserContextProvider>
                <Navigation/>
            </UserContextProvider>
        </ThemeProvider>
    )
}
