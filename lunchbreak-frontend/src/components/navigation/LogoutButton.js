import React, {useContext} from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaSignOutAlt} from "react-icons/all";
import {LOGOUT} from "../../context/user/UserContextProvider";
import {UserDispatchContext} from "../../context/user/UserContext";
import {removeJWTToken} from "../../utils/JWTUtils";

export default function LogoutButton() {
    const dispatch = useContext(UserDispatchContext);

    function logout() {
        dispatch({type: LOGOUT});
        removeJWTToken();
    }

    return (
        <div onClick={logout} style={{cursor: 'pointer'}}>
            <SvgIcon color="primary">
                <FaSignOutAlt/>
            </SvgIcon>
        </div>
    )
}
