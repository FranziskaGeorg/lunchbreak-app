import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import ProfileForm from "../components/profile/ProfileForm";

const useStyles = makeStyles((theme) => ({
    gridContainer: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(1)
    },
    card: {
        marginBottom: theme.spacing(10)
    }
}));

export default function ProfilePage() {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <Grid container
                  className={classes.gridContainer}
                  direction="column"
                  alignContent="center"
                  justify="center"
                  spacing={1}
            >
                <CardContent>
                    <ProfileForm/>
                </CardContent>
            </Grid>
        </Card>
    )
}