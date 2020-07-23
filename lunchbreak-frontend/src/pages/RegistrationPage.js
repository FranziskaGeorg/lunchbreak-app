import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import RegistrationForm from "../components/inputForms/RegistrationForm";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    bigBox: {
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        height: "80%",
        padding: theme.spacing(4)
    }
}));

export default function RegistrationPage() {
    const classes = useStyles();

    return (
        <Box className={classes.bigBox}>
            <RegistrationForm/>
        </Box>
    )
}