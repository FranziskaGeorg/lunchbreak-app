import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import nerdLogo from "../../images/happytoast_nerd.png";
import Box from "@material-ui/core/Box";
import {AboutText, HowToSteps} from "./HowToTextSnippets";
import HowToAccordion from "./HowToAccordion";

const useStyles = makeStyles((theme) => ({
    howToBox: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "flexStart",
        '@media (max-width: 599px)': {
            maxWidth: "100%"
        },
        '@media (min-width:600px)': {
            width: "75vw",
            maxWidth: "1000px"
        }
    },
    logoBox: {
        textAlign: "center",
        paddingBottom: theme.spacing(2)
    },
    logo: {
        width: "150px",
        height: "150px"
    },
    accordion: {
        boxShadow: "none"
    },
    accordionHeading: {
        fontSize: "20px"
    }
}));

export default function HowToGuide() {
    const classes = useStyles();

    return (
        <Box className={classes.howToBox}>
            <Box className={classes.logoBox}>
                <img src={nerdLogo} alt="Lunchbreak logo for how to section" className={classes.logo}/>
            </Box>
            <Box>
                <HowToAccordion panelNumber="1" headingText="Über LunchBreak" howToContent={<AboutText/>}/>
                <HowToAccordion panelNumber="2" headingText="Wie funktioniert die App?" howToContent={<HowToSteps/>}/>
                <HowToAccordion panelNumber="3" headingText="Impressum" howToContent="Blabla"/>
            </Box>
        </Box>
    )
}