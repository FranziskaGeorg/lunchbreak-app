import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import LoginForm from "../components/inputForms/LoginForm";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        minHeight: "95%"
    },
    bigBox: {
        flexGrow: 1,
        maxWidth: "1000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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


