import React, {useContext} from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaSignOutAlt} from "react-icons/all";
import {useLocation} from "react-router";
import {LOGOUT} from "../context/user/UserContextProvider";
import {UserDispatchContext} from "../context/user/UserContext";

export default function LogoutButton() {
    const location = useLocation();
    const dispatch = useContext(UserDispatchContext);

    function logout() {
        dispatch({type: LOGOUT});
    }

    return (
        <div onClick={logout} style={{cursor: 'pointer'}}>
            <SvgIcon color="primary">
                <FaSignOutAlt/>
            </SvgIcon>
        </div>
    )
}
