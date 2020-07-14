import React, {useContext} from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaSignOutAlt} from "react-icons/all";
<<<<<<< HEAD
=======
import {useLocation} from "react-router";
>>>>>>> 804cc45e65ab2c96cf4f0deaebefd9e9b7424ce5
import {LOGOUT} from "../context/user/UserContextProvider";
import {UserDispatchContext} from "../context/user/UserContext";

export default function LogoutButton() {
<<<<<<< HEAD
=======
    const location = useLocation();
>>>>>>> 804cc45e65ab2c96cf4f0deaebefd9e9b7424ce5
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
