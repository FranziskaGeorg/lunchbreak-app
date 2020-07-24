import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginForm from "../components/inputForms/LoginForm";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        minHeight: "80%"
    },
    bigBox: {
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: theme.spacing(4)
    }
}));

export default function LoginPage() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Box className={classes.bigBox}>
                <LoginForm/>
            </Box>
        </Box>
    );
}


