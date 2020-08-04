import React, {useContext, useEffect} from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserContextProvider, {LOGIN_FAILED, LOGIN_SUCCESS} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import {UserDispatchContext} from "./context/user/UserContext";
import {getDecodedJWTToken, isJWTTokenValid} from "./utils/JWTUtils";
import DailyMatch from "./pages/DailyMatch";
import ProfilePage from "./pages/ProfilePage";
import LogoutPage from "./pages/LogoutPage";
import Header from "./components/navigation/Header";
import LunchBreakTheme from "./theme/LunchBreakTheme";
import {ThemeProvider} from '@material-ui/styles';
import BottomNavBar from "./components/navigation/BottomNavBar";
import RegistrationPage from "./pages/RegistrationPage";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import LunchHistory from "./pages/LunchHistory";
import HowToPage from "./pages/HowToPage";

const useStyles = makeStyles((theme) => ({
    overallContainer: {
        background: "linear-gradient(180deg, rgba(241,246,247,1) 0%, rgba(238,245,246,1) 20%, rgba(192,227,220,0.6) 100%)",
        height: "100vh",
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        padding: theme.spacing(2),
        overflowY: "scroll"
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
        <Box className={classes.overallContainer}>
            <Switch>
                <Route path="/login" component={LoginPage}/>
                <Route path="/register" component={RegistrationPage} exact/>
                <PrivateRoute path="/dailymatch" component={DailyMatch} exact/>
                <PrivateRoute path="/profile" component={ProfilePage} exact/>
                <PrivateRoute path="/history" component={LunchHistory} exact/>
                <PrivateRoute path="/howto" component={HowToPage} exact/>
                <Route path="/logout" component={LogoutPage} exact/>
            </Switch>
        </Box>
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
