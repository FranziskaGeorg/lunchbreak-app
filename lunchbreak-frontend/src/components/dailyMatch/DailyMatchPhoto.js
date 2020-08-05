import React from "react";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    pictureBox: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "100%",
        maxWidth: "400px",
        height: "100%",
        borderRadius: "10px",
        paddingTop: theme.spacing(2),
        '@media (min-width: 506px)': {
            minHeight: "300px",
            marginTop: theme.spacing(4)
        },
    },
    profilePicture: {
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        objectFit: "cover",
        boxShadow: "0px 2px 5px 0px #989898"
    },
    profilePictureLight: {
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        objectFit: "cover",
        opacity: "0.2",
        filter: "grayscale(100%)"
    }
}));


export default function DailyMatchPhoto({dailyMatch, profileFilled}) {
    const classes = useStyles();
    const defaultPicUrl = "https://res.cloudinary.com/hql1hvgt9/image/upload/v1595940220/happytoast_profilepicture_rhovob.png";

    return (
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
                 src={defaultPicUrl}
                 alt="custom user avatar"/>}
            {!dailyMatch.profilePicUrl && !profileFilled &&
            <img className={classes.profilePictureLight}
                  src={defaultPicUrl}
                  alt="custom user avatar"/>}
        </Box>
    )
}