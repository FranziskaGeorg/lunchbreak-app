import React from "react";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import RegistrationForm from "../components/inputForms/RegistrationForm";

const useStyles = makeStyles((theme) => ({
    gridBigContainer: {
        height: "80vh",
        paddingTop: "30%"
    },
    gridContainer: {
        padding: theme.spacing(4)
    }
}));

export default function RegistrationPage() {
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
                        <RegistrationForm/>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    )
}