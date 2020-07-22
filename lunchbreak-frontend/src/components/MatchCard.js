import React, {useState, useEffect} from 'react';
import {getRandomColleagueFetch} from "../utils/FetchUtils";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import ButtonYellowBigPacifico from "./buttons/ButtonYellowBigPacifico";
import PopupLunchMatch from "./popups/PopupLunchMatch";

export default function MatchCard() {
    const [dailyMatch, setDailyMatch] = useState({});
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        getRandomColleagueFetch()
            .then(data => setDailyMatch(data));
        console.log(dailyMatch);
    }, [])

    function handleShuffleClick() {
        getRandomColleagueFetch()
            .then(data => setDailyMatch(data));
    }

    function handleLunchClick() {
        setShowPopup(true);
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h3" component="h2">
                    {dailyMatch.firstName}
                </Typography>
                <Typography variant="body2" component="p">
                    Hi there!
                </Typography>
            </CardContent>
            <CardActions>
                <ButtonYellowBigPacifico handleClick={handleShuffleClick} buttonText="Mischen"/>
                <ButtonYellowBigPacifico handleClick={handleLunchClick} buttonText="Lunchen"/>
            </CardActions>
            <PopupLunchMatch showPopup={showPopup} setShowPopup={setShowPopup}/>
        </Card>
    )
}