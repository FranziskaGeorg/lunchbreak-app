import React from "react";
import HowToGuide from "../components/howTo/HowToGuide";
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
        boxShadow: "0px 2px 5px 0px #CDE7E4",
        borderRadius: "10px",
        padding: theme.spacing(2)
    }
}));

export default function HowToPage() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Box className={classes.bigBox}>
                <HowToGuide/>
            </Box>
        </Box>
    )
}