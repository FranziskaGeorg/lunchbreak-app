import React, {useContext, useEffect} from 'react';
import './App.css';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserContextProvider, {LOGIN_SUCCESS} from "./context/user/UserContextProvider";
import PrivateRoute from "./pages/PrivateRoute";
import {UserDispatchContext} from "./context/user/UserContext";
import {getDecodedJWTToken, isJWTTokenValid} from "./utils/JWTUtils";
import DailyMatch from "./pages/DailyMatch";
import Header from "./components/Header";

function Navigation() {
    const dispatch = useContext(UserDispatchContext);

    useEffect(() => {
        if (isJWTTokenValid()) {
            dispatch({type: LOGIN_SUCCESS, payload: getDecodedJWTToken()});
        }
    }, [dispatch]);

    return <BrowserRouter>
        <Header/>
        <Switch>
            <Route path="/login" component={LoginPage} exact/>
            <PrivateRoute path="/dailymatch" component={DailyMatch} exact/>
        </Switch>
    </BrowserRouter>
}

export default function App() {
    return (
        <UserContextProvider>
            <Navigation/>
        </UserContextProvider>
    )
}
