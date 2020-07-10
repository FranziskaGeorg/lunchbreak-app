import React from 'react';
import './App.css';
import MatchCard from "./components/MatchCard";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserContextProvider from "./context/user/UserContextProvider";

function Navigation() {
    return <BrowserRouter>
        <Switch>
            <Route path="/login" component={LoginPage}/>
            <Route path="/" component={MatchCard} exact/>
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
