import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import {useLocation} from "react-router";
import {UserStateContext} from "../context/user/UserContext";
import logo from '../images/happytoast.png';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    logo: {
        marginRight: theme.spacing(0.5),
        width: '12%',
        height: '12%'
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Header() {
    const classes = useStyles();

    let location = useLocation();
    console.log(location);

    const {authStatus} = useContext(UserStateContext);
    if (authStatus === 'SUCCESS') {

        return (
            <div className={classes.root}>
                <AppBar position="static" color="info">
                    <Toolbar>
                        {location.pathname === '/dailymatch' &&
                        <Typography variant="h4" color="primary" className={classes.title}>
                            Lunchen mit...
                        </Typography>}
                        <img src={logo} alt="Lunchbreak logo" className={classes.logo}/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
    return (
        <>
        </>
    );
}