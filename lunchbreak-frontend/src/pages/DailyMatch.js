import React from "react";
import DailyMatchCard from "../components/matchDisplays/DailyMatchCard";
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
                <DailyMatchCard/>
            </Grid>
        </Grid>
    )
}