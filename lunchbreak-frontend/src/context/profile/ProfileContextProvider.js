import React, {useReducer} from "react";
import {ProfileDispatchContext, ProfileStateContext} from "../profile/ProfileContext";
export const PROFILE = 'PROFILE';
export const PROFILE_FILLED = 'PROFILE_FILLED';

import {
    PROFILE,
    PROFILE_FILLED
} from "../profile/ProfileContextProvider";

function reducer(state, action) {
    switch (action.type) {
        case PROFILE:
            return { ...state, profileStatus: 'PENDING' };
        case PROFILE_FILLED:
            return {
                ...state,
                profileStatus: 'SUCCESS',
                profileData: action.payload,
            };
        default:
            return state;
    }
}

export default function ProfileContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <ProfileStateContext.Provider value={state}>
            <ProfileDispatchContext.Provider value={dispatch}>
                {children}
            </ProfileDispatchContext.Provider>
        </ProfileStateContext.Provider>
    );
}