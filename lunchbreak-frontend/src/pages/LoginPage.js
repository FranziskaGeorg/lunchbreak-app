import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import LoginForm from "../components/inputForms/LoginForm";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex"
    },
    bigBox: {
        padding: theme.spacing(4)
    }
}));

export default function LoginPage() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Card>
                <Box className={classes.bigBox}>
                    <LoginForm/>
                </Box>
            </Card>
        </Box>
    );
}


