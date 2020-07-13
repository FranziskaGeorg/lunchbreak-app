import React, {useContext} from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaSignOutAlt} from "react-icons/all";
import {useLocation} from "react-router";
import {Redirect} from "react-router-dom";
import {LOGOUT} from "../context/user/UserContextProvider";
import {UserDispatchContext, UserStateContext} from "../context/user/UserContext";

export default function LogoutIcon() {
    let location = useLocation();
    const dispatch = useContext(UserDispatchContext);

    function logout() {
        dispatch({type: LOGOUT});
    }

    const { authStatus } = useContext(UserStateContext);
    if (authStatus === undefined) {
        return <Redirect to={'/login'} />;
    }

    return (
        <div onClick={logout} style={{cursor:'pointer'}}>
        {location.pathname === '/logout' ?
                <SvgIcon color="error">
                    <FaSignOutAlt/>
                </SvgIcon> :
                <SvgIcon color="primary">
                    <FaSignOutAlt/>
                </SvgIcon>
        }
        </div>
    )
}
