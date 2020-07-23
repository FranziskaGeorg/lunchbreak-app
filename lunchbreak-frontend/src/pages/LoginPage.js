import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginForm from "../components/inputForms/LoginForm";
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

export default function LoginPage() {
    const classes = useStyles();

    return (
        <Box className={classes.bigBox}>
            <LoginForm/>
        </Box>
    );
}


