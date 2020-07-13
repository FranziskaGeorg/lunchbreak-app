import React, {useContext} from "react";
import {UserStateContext} from "../context/user/UserContext";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FaUtensils, FaUser, FaCalendarAlt, FaPaperPlane, FaSignOutAlt} from "react-icons/all";
import SvgIcon from '@material-ui/core/SvgIcon';
import Grid from "@material-ui/core/Grid";
import {useLocation} from "react-router";
import {Link} from 'react-router-dom';
import LogoutButton from "./LogoutButton";

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

    function NavBarButton({currentPath, icon}) {
        return (
            <Link to={currentPath}>
                {location.pathname === currentPath ?
                    <SvgIcon color="error">
                        {icon}
                    </SvgIcon> :
                    <SvgIcon color="primary">
                        {icon}
                    </SvgIcon>}
            </Link>
        )
    }

    if (authStatus !== 'SUCCESS') {
        return (
            <>
            </>
        )
    }
    return (
        <AppBar color="info" className={classes.appBar}>
            <Toolbar>
                <Grid container justify="space-between">
                    <Grid item>
                        <NavBarButton currentPath={"/dailymatch"} icon={<FaUtensils/>}/>
                    </Grid>
                    <Grid item>
                        <NavBarButton currentPath={"/profile"} icon={<FaUser/>}/>
                    </Grid>
                    <Grid item>
                        <NavBarButton currentPath={"/history"} icon={<FaCalendarAlt/>}/>
                    </Grid>
                    <Grid item>
                        <NavBarButton currentPath={"/news"} icon={<FaPaperPlane/>}/>
                    </Grid>
                    <Grid item>
                        <LogoutButton/>
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}