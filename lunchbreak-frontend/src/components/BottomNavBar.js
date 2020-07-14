import React, {useContext} from "react";
import {UserStateContext} from "../context/user/UserContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FaUtensils, FaUser, FaCalendarAlt, FaPaperPlane} from "react-icons/all";
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from "@material-ui/core/Grid";
import {useLocation} from "react-router";
import {Link} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: "fixed",
        top: 'auto',
        bottom: "0"
    }
}));

export default function BottomNavBar() {
    const classes = useStyles();
    let location = useLocation();

    const {authStatus} = useContext(UserStateContext);
    if (authStatus === 'SUCCESS') {

        return (
            <AppBar color="info" className={classes.appBar}>
                <Toolbar>
                    <Grid container justify="space-between">
                        <Grid item>
                            <Link to="/dailymatch">
                            {location.pathname === '/dailymatch' ?
                                <SvgIcon color="error">
                                    <FaUtensils/>
                                </SvgIcon> :
                                <SvgIcon color="primary">
                                    <FaUtensils/>
                                </SvgIcon>}
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link to="/profile">
                                {location.pathname === '/profile' ?
                                    <SvgIcon color="error">
                                        <FaUser/>
                                    </SvgIcon> :
                                    <SvgIcon color="primary">
                                        <FaUser/>
                                    </SvgIcon>}
                            </Link>
                        </Grid>
                        <Grid item>
                            {location.pathname === '/history' ?
                                <SvgIcon color="error">
                                    <FaCalendarAlt/>
                                </SvgIcon> :
                                <SvgIcon color="primary">
                                    <FaCalendarAlt/>
                                </SvgIcon>}
                        </Grid>
                        <Grid item>
                            {location.pathname === '/news' ?
                                <SvgIcon color="error">
                                    <FaPaperPlane/>
                                </SvgIcon> :
                                <SvgIcon color="primary">
                                    <FaPaperPlane/>
                                </SvgIcon>}
                        </Grid>
                        <Grid item>
                            {location.pathname === '/logout' ?
                                <SvgIcon color="error">
                                    <FaSignOutAlt/>
                                </SvgIcon> :
                                <SvgIcon color="primary">
                                    <FaSignOutAlt/>
                                </SvgIcon>}
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        );
    }
    return (
        <>
        </>
    );
}