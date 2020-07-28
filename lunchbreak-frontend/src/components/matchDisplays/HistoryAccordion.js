import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {getLunchMatchesFetch} from "../../utils/HistoryFetchUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
    },
    accordion: {
        boxShadow: "none"
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: "33.33%",
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    link: {
        color: "#009899",
        textDecoration: "none",
        '&:hover': {
            color: "#dfa528"
        }
    },
    miniPicture: {
        width: "50px",
        height: "50px",
        borderRadius: "5px",
        marginRight: theme.spacing(2)
    }
}));

export default function HistoryAccordion() {
    const classes = useStyles();

    const [lunchMatches, setLunchMatches] = useState([]);

    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        getLunchMatchesFetch()
            .then(data => setLunchMatches(data));
    })

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div className={classes.root}>
            {lunchMatches.map(lunchMatch =>
                <Accordion className={classes.accordion}
                           expanded={expanded === 'panel1'}
                           onChange={handleChange('panel1')}>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon/>}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{lunchMatch.matchDate}</Typography>
                        <img className={classes.miniPicture} src={lunchMatch.profilePicUrl} alt="custom user avatar"/>
                        <Typography
                            className={classes.secondaryHeading}>{lunchMatch.firstName}<br/>{lunchMatch.lastName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            E-Mail-Adresse: <a className={classes.link} href={`mailto:${lunchMatch.matchedUsername}`}>
                            {lunchMatch.matchedUsername}
                        </a>
                            <br/><br/>
                            Handynummer: <a className={classes.link} href={`tel:${lunchMatch.phoneNumber}`}>
                            {lunchMatch.phoneNumber}
                        </a>
                        </Typography>
                    </AccordionDetails>
                </Accordion>)}
        </div>
    );
}