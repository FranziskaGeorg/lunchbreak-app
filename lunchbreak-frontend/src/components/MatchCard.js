import React, {useState, useEffect} from 'react';
import {getRandomColleagueFetch} from "../utils/FetchUtils";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

export default function MatchCard() {
    const classes = useStyles();
    const [dailyMatch, setDailyMatch] = useState({});

    useEffect(() => {
        getRandomColleagueFetch()
            .then(data => setDailyMatch(data));
    }, [])

    function handleShuffleClick() {
        getRandomColleagueFetch()
            .then(data => setDailyMatch(data));
    }

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {dailyMatch.firstName}
                </Typography>
                <Typography variant="body2" component="p">
                    Hi there!
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleShuffleClick}>Neu mischen</Button>
                <Button size="small">Lunchen gehen</Button>
            </CardActions>
        </Card>
    )
}