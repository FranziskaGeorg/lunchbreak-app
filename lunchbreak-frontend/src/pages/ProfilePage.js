import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ProfileForm from "../components/inputForms/ProfileForm";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    bigBox: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: theme.spacing(4),
        marginTop: "40vh"
    }
}));

export default function ProfilePage() {
    const classes = useStyles();

    return (
        <Box className={classes.bigBox}>
            <ProfileForm/>
        </Box>
    )
}