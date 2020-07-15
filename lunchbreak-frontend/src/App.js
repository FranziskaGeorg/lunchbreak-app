import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserContextProvider, {LOGIN_SUCCESS} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import {UserDispatchContext} from "./context/user/UserContext";
import {getDecodedJWTToken, isJWTTokenValid} from "./utils/JWTUtils";
import DailyMatch from "./pages/DailyMatch";
import ProfilePage from "./pages/ProfilePage";
import Header from "./components/Header";
import LunchBreakTheme from "./theme/LunchBreakTheme";
import {ThemeProvider} from '@material-ui/styles';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import BottomNavBar from "./components/BottomNavBar";
import RegistrationPage from "./pages/RegistrationPage";

function Navigation() {
    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({type: LOGIN_SUCCESS, payload: getDecodedJWTToken()});
        }
    }, [dispatch]);

    return <BrowserRouter>
        <Header/>
        <Container maxWidth={'md'} component="main">
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
                <CssBaseline />
                <Navigation/>
            </UserContextProvider>
        </ThemeProvider>
    )
}
