import React, {useState, useEffect} from 'react';
import {getRandomColleagueFetch} from "../utils/FetchUtils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

export default function MatchCard() {
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
        <Card>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {dailyMatch.firstName}
                </Typography>
                <Typography variant="body2" component="p">
                    Hi there!
                </Typography>
            </CardContent>
            <CardActions>
                <Button variant="contained" size="small" color="secondary" onClick={handleShuffleClick}>Neu mischen</Button>
                <Button variant="contained" size="small" color="secondary">Lunchen gehen</Button>
            </CardActions>
        </Card>
    )
}