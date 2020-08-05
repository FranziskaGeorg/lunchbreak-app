import React from "react";
import Box from "@material-ui/core/Box";
import InputTextFieldDisabled from "../inputFields/InputTextFieldDisabled";
import InputTextField from "../inputFields/InputTextField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    }
}));

export default function ProfileFormContactFields({username, setUsername, phoneNumber, setPhoneNumber}) {
    const classes = useStyles();

    return (
        <>
            <Box className={classes.nextTopic}>
                <InputTextFieldDisabled fieldName="username" label="E-Mail-Adresse" value={username}
                                        setValue={setUsername}/>
            </Box>
            <Box>
                <InputTextField fieldName="phoneNumber" label="Handynummer" value={phoneNumber}
                                setValue={setPhoneNumber}/>
            </Box>
        </>
    )
}