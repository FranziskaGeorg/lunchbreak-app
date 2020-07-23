import React, {useState, useEffect} from 'react';
import {getMatchingColleagueFetch, getProfileStatusFetch} from "../../utils/FetchUtils";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import ButtonYellowBigPacifico from "../buttons/ButtonYellowBigPacifico";
import PopupLunchMatch from "../popups/PopupLunchMatch";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaBriefcase, FaThumbsUp, FaUtensils} from "react-icons/all";

const useStyles = makeStyles((theme) => ({
    bigBox: {
        padding: theme.spacing(3)
    },
    nextTopicLarge: {
        paddingTop: theme.spacing(3)
    },
    nextTopicSmall: {
        paddingTop: theme.spacing(1)
    },
    icon: {
        marginRight: theme.spacing(2)
    }
}));

export default function DailyMatchCard() {
    const classes = useStyles();

    const [dailyMatch, setDailyMatch] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [profileFilled, setProfileFilled] = useState(false);

    useEffect(() => {
        getProfileStatusFetch()
            .then(data => setProfileFilled(data));
        getMatchingColleagueFetch()
            .then(data => setDailyMatch(data));
    }, [])

    console.log(profileFilled);

    function handleShuffleClick() {
        getMatchingColleagueFetch()
            .then(data => setDailyMatch(data));
    }

    function handleLunchClick() {
        setShowPopup(true);
    }

    return (
        <Card>
            <Box className={classes.bigBox}
                 display="flex"
                 flexDirection="column"
            >
                <Box>
                    <Typography variant="h5">
                        {dailyMatch.firstName}
                    </Typography>
                    <Box className={classes.nextTopicLarge}
                         display="flex"
                         flexDirection="row"
                         alignItems="center">
                        <SvgIcon className={classes.icon} color="primary">
                            <FaBriefcase/>
                        </SvgIcon>
                        <Typography variant="body1">
                            {dailyMatch.job} ({dailyMatch.subsidiary})
                        </Typography>
                    </Box>
                    <Box className={classes.nextTopicSmall}
                         display="flex"
                         flexDirection="row"
                         alignItems="center">
                        <SvgIcon className={classes.icon} color="primary">
                            <FaUtensils/>
                        </SvgIcon>
                        <Typography variant="body1">
                            {dailyMatch.favoriteFood}
                        </Typography>
                    </Box>
                    <Box className={classes.nextTopicSmall}
                         display="flex"
                         flexDirection="row"
                         alignItems="center">
                        <SvgIcon className={classes.icon} color="primary">
                            <FaThumbsUp/>
                        </SvgIcon>
                        <Typography variant="body1">
                            {dailyMatch.hobbies}
                        </Typography>
                    </Box>
                </Box>
                <Box className={classes.nextTopicLarge}
                     display="flex"
                     flexDirection="row"
                     justifyContent="space-around"
                >
                    <ButtonYellowBigPacifico handleClick={handleShuffleClick} buttonText="Mischen"/>
                    <ButtonYellowBigPacifico handleClick={handleLunchClick} buttonText="Lunchen"/>
                </Box>
            </Box>
            <PopupLunchMatch showPopup={showPopup} setShowPopup={setShowPopup} matchData={dailyMatch}/>
        </Card>
    )
}