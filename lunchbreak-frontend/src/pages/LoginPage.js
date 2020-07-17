import Grid from "@material-ui/core/Grid";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import LoginForm from "../components/inputForms/LoginForm";

const useStyles = makeStyles((theme) => ({
    gridBigContainer: {
        height: "60vh",
        paddingTop: "40%",
    },
    gridContainer: {
        padding: theme.spacing(4)
    },
    buttonNonContained: {
        color: "primary",
        fontFamily: "Arimo",
        textTransform: "none",
        textAlign: "center"
    },
    nextTopic: {
        paddingTop: theme.spacing(3)
    }
}));

export default function LoginPage() {
    const classes = useStyles();

    return (
        <Grid container
              className={classes.gridBigContainer}
              direction="row"
              justify="center"
        >
            <Card>
                <Grid item>
                    <Grid container
                          className={classes.gridContainer}
                          direction="column"
                          alignContent="center"
                          justify="center"
                    >
                        <LoginForm/>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
}


