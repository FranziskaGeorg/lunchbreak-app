import React, {useState} from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import nerdLogo from "../../images/happytoast_nerd.png";
import Box from "@material-ui/core/Box";

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
    }
}));

export default function HowToGuide() {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <Box className={classes.howToBox}>
            <Box className={classes.logoBox}>
                <img src={nerdLogo} alt="Lunchbreak logo for how to section" className={classes.logo}/>
            </Box>
            <Box>
                <Accordion className={classes.accordion}
                           expanded={expanded === 'panel1'}
                           onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header">
                        <Typography>Über LunchBreak</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Blabla
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.accordion}
                           expanded={expanded === 'panel2'}
                           onChange={handleChange('panel2')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel2bh-content"
                        id="panel2bh-header">
                        <Typography className={classes.heading}>Wie funktioniert die App?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Blabla
                        </Typography>
                    </AccordionDetails>
                </Accordion>
                <Accordion className={classes.accordion}
                           expanded={expanded === 'panel3'}
                           onChange={handleChange('panel3')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel3bh-content"
                        id="panel3bh-header">
                        <Typography className={classes.heading}>Impressum</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            Blabla
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </Box>
        </Box>
    )
}