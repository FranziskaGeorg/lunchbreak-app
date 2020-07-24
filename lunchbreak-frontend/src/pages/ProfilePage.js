import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ProfileForm from "../components/inputForms/ProfileForm";
import {Box} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        minHeight: "95%"
    },
    bigBox: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: theme.spacing(4)
    }
}));

export default function ProfilePage() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Box className={classes.bigBox}>
                <ProfileForm/>
            </Box>
        </Box>
    )
}