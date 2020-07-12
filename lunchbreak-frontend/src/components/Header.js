import React, {useContext} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useLocation} from "react-router";
import {UserStateContext} from "../context/user/UserContext";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
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
                <AppBar position="static">
                    <Toolbar>
                        {location.pathname === '/dailymatch' &&
                        <Typography variant="h6" className={classes.title}>
                            Lunchen mit...
                        </Typography>}
                        <Button color="inherit">Login</Button>
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