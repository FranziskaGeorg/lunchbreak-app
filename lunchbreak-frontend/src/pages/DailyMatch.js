import React from "react";
import DailyMatchCard from "../components/matchDisplays/DailyMatchCard";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex",
        justifyContent: "center",
        width: "100vw"
    },
    bigBox: {
        flexGrow: 1,
        maxWidth: "1000px",
        display: "flex",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        '@media (min-width: 599px)': {
            maxHeight: "300px"
        }
    }
}));

export default function DailyMatch() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Box className={classes.bigBox}>
                <DailyMatchCard/>
            </Box>
        </Box>
    )
}