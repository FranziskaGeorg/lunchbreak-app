import React from "react";
import MatchCard from "../components/MatchCard";
import Grid from "@material-ui/core/Grid";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
        flexGrow: 1
    }
});

export default function DailyMatch() {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item className={classes.root}>
                <MatchCard/>
            </Grid>
        </Grid>
    )
}