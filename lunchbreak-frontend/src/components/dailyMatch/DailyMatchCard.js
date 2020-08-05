import React, {useState, useEffect} from 'react';
import {checkIfMatchIsMutualFetch, getMatchingColleagueFetch, saveLunchMatchFetch} from "../../utils/MatchFetchUtils";
import Typography from "@material-ui/core/Typography";
import PopupLunchMatch from "../popups/PopupLunchMatch";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import {FaBriefcase, FaThumbsUp, FaUtensils, FaMapMarkerAlt} from "react-icons/all";
import SnackbarFillProfile from "../popups/SnackbarFillProfile";
import ButtonYellowPacifico from "../buttons/ButtonYellowPacifico";
import {getProfileStatusFetch} from "../../utils/ProfileFetchUtils";
import DailyMatchInfo from "./DailyMatchInfo";
import DailyMatchPhoto from "./DailyMatchPhoto";

const useStyles = makeStyles((theme) => ({
    cardBox: {
        display: "flex",
        '@media (max-width: 505px)': {
            flexDirection: "column"
        },
        '@media (min-width: 506px)': {
            flexDirection: "row",
            alignItems: "center"
        },
        width: "100%"
    },
    bigBox: {
        display: "flex",
        flexDirection: "column",
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(1)
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: theme.spacing(3)
    },
    infoBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: theme.spacing(1)
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

    function handleShuffleClick() {
        getMatchingColleagueFetch()
            .then(data => setDailyMatch(data));
    }

    async function handleLunchClick() {
        await saveLunchMatchFetch(dailyMatch.username);
        const isMatchMutual = await checkIfMatchIsMutualFetch(dailyMatch.username);
        if (isMatchMutual) {
            setShowPopup(true);
        }
    }

    return (
        <Box className={classes.cardBox}>
            <DailyMatchPhoto dailyMatch={dailyMatch} profileFilled={profileFilled}/>
            <Box className={classes.bigBox}>
                <Box>
                    <Typography variant="h5">
                        {dailyMatch.firstName}
                    </Typography>
                    <Box className={classes.infoBox}>
                        <DailyMatchInfo icon={<FaBriefcase/>} profileInput={dailyMatch.job + " (" + dailyMatch.subsidiary +")"}/>
                    </Box>
                    <Box className={classes.infoBox}>
                        <DailyMatchInfo icon={<FaMapMarkerAlt/>} profileInput={dailyMatch.location}/>
                    </Box>
                    <Box className={classes.infoBox}>
                        <DailyMatchInfo icon={<FaUtensils/>} profileInput={dailyMatch.favoriteFood}/>
                    </Box>
                    <Box className={classes.infoBox}>
                        <DailyMatchInfo icon={<FaThumbsUp/>} profileInput={dailyMatch.hobbies}/>
                    </Box>
                </Box>
                <Box className={classes.buttonBox}>
                    <Box>
                        <ButtonYellowPacifico disabled={!profileFilled} handleClick={handleShuffleClick}
                                              buttonText="Mischen"/>
                    </Box>
                    <Box>
                        <ButtonYellowPacifico disabled={!profileFilled} handleClick={handleLunchClick}
                                              buttonText="Lunchen"/>
                    </Box>
                </Box>
            </Box>
            <PopupLunchMatch showPopup={showPopup} setShowPopup={setShowPopup} matchData={dailyMatch}/>
            <SnackbarFillProfile showSnackbar={!profileFilled}/>
        </Box>
    )
}