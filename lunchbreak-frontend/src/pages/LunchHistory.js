import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import HistoryAccordion from "../components/matchDisplays/HistoryAccordion";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        minHeight: "80%"
    },
    bigBox: {
        flexGrow: 1,
        display: "flex",
        alignItems: "flex-start"
    }
}));

export default function LunchHistory() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Box className={classes.bigBox}>
                <HistoryAccordion/>
            </Box>
        </Box>
    )
}