import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {useLocation} from "react-router";
import {UserStateContext} from "../../context/user/UserContext";
import logo from '../../images/happytoast_white.png';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "sticky",
        flexGrow: 1,
        boxShadow: "none",
        opacity: "100%",
        backgroundColor: "#009899"
    },
    logo: {
        margin: theme.spacing(0.5),
        width: '12%',
        maxWidth: "60px"
    },
    title: {
        flexGrow: 1,
        color: "#ffffff"
    },
}));

export default function Header() {
    const classes = useStyles();
    const location = useLocation();
    const {authStatus} = useContext(UserStateContext);

    function HeaderTitle({currentPath, titleText}) {
        if (location.pathname === currentPath) {
            return (
                <Typography variant="h4" className={classes.title}>
                    {titleText}
                </Typography>
            );
        }
        return (
            <>
            </>
        )
    }

    if (authStatus !== 'SUCCESS') {
        return (
            <>
            </>
        )
    }
    return (
        <AppBar position="static" color="info" className={classes.appBar}>
            <Toolbar>
                <HeaderTitle currentPath="/dailymatch" titleText="Lunchen mit..."/>
                <HeaderTitle currentPath="/profile" titleText="Dein Profil"/>
                <HeaderTitle currentPath="/history" titleText="Deine Matches"/>
                <HeaderTitle currentPath="/howto" titleText="Faktencheck"/>
                <img src={logo} alt="Lunchbreak logo" className={classes.logo}/>
            </Toolbar>
        </AppBar>
    );
}