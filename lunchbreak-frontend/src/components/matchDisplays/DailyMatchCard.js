import React, {useState, useEffect} from 'react';
import {getMatchingColleagueFetch, saveLunchMatchFetch} from "../../utils/MatchFetchUtils";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import PopupLunchMatch from "../popups/PopupLunchMatch";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaBriefcase, FaThumbsUp, FaUtensils} from "react-icons/all";
import SnackbarFillProfile from "../popups/SnackbarFillProfile";
import ButtonYellowMediumPacifico from "../buttons/ButtonYellowMediumPacifico";
import {getProfileStatusFetch} from "../../utils/ProfileFetchUtils";

const useStyles = makeStyles((theme) => ({
    card: {
        boxShadow: "none"
    },
    pictureBox: {
        width: "100%",
        height: "100%",
        position: "relative"
    },
    bigBox: {
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        paddingTop: theme.spacing(1)
    },
    profilePicture: {
        minWidth: "100%",
        maxHeight: "300px",
        objectFit: "cover"
    },
    profilePictureLight: {
        minWidth: "100%",
        maxHeight: "300px",
        objectFit: "cover",
        opacity: "0.2",
        filter: "grayscale(100%)"
    },
    nextTopicLarge: {
        paddingTop: theme.spacing(3)
    },
    nextTopicSmall: {
        paddingTop: theme.spacing(1)
    },
    icon: {
        marginRight: theme.spacing(2),
        fontSize: "22px"
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

    function handleLunchClick() {
        setShowPopup(true);
        saveLunchMatchFetch(dailyMatch.username)
            .then(data => console.log(data));
    }

    return (
        <Card className={classes.card}>
            <Box className={classes.pictureBox}>
                {dailyMatch.profilePicUrl && profileFilled &&
                <img className={classes.profilePicture}
                     src={dailyMatch.profilePicUrl}
                     alt="custom user avatar"/>}
                {dailyMatch.profilePicUrl && !profileFilled &&
                <img className={classes.profilePictureLight}
                     src={dailyMatch.profilePicUrl}
                     alt="custom user avatar"/>}
                {!dailyMatch.profilePicUrl && profileFilled &&
                <img className={classes.profilePicture}
                     src="https://res.cloudinary.com/hql1hvgt9/image/upload/v1595940220/happytoast_profilepicture_rhovob.png"
                     alt="custom user avatar"/>}
                {!dailyMatch.profilePicUrl && !profileFilled &&
                < img className={classes.profilePictureLight}
                      src="https://res.cloudinary.com/hql1hvgt9/image/upload/v1595940220/happytoast_profilepicture_rhovob.png"
                      alt="custom user avatar"/>}
            </Box>
            <Box className={classes.bigBox}
                 display="flex"
                 flexDirection="column"
            >
                <Box>
                    <Typography variant="h5">
                        {dailyMatch.firstName}
                    </Typography>
                    <Box className={classes.nextTopicSmall}
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
                    <Box>
                        <ButtonYellowMediumPacifico disabled={!profileFilled} handleClick={handleShuffleClick}
                                                    buttonText="Mischen"/>
                    </Box>
                    <Box>
                        <ButtonYellowMediumPacifico disabled={!profileFilled} handleClick={handleLunchClick}
                                                    buttonText="Lunchen"/>
                    </Box>
                </Box>
            </Box>
            <PopupLunchMatch showPopup={showPopup} setShowPopup={setShowPopup} matchData={dailyMatch}/>
            <SnackbarFillProfile showSnackbar={!profileFilled}/>
        </Card>
    )
}