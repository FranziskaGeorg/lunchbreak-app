import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {checkIfMatchInHistoryIsMutualFetch, getLunchMatchesFetch} from "../../utils/HistoryFetchUtils";
import {FaEnvelope, FaPhone, FaCalendarCheck} from "react-icons/all";
import SvgIcon from "@material-ui/core/SvgIcon";
import {sortLunchdays, translateLunchday} from "../../utils/LunchDayUtils";
import getFormattedDate from "../../utils/DateFormatUtils";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%"
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
        borderRadius: "50%",
        marginRight: theme.spacing(2)
    },
    icon: {
        marginRight: theme.spacing(1),
        fontSize: "20px",
        position: "relative",
        top: "5px"
    },
    lunchdayText: {
        marginLeft: theme.spacing(0.5)
    },
    accordion: {
        boxShadow: "0px 2px 5px 0px #CDE7E4"
    }
}));

export default function HistoryAccordion() {
    const classes = useStyles();

    const [lunchMatches, setLunchMatches] = useState([]);
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        async function getMutualMatches() {
            const data = await getLunchMatchesFetch();
            const mutualMatches = await filter(data, async lunchMatch => await checkIfMatchInHistoryIsMutualFetch(lunchMatch.matchedUsername))
            setLunchMatches(mutualMatches);
        };
        getMutualMatches();
    },[]);

    async function filter(arr, callback) {
        const fail = Symbol()
        return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
    }

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <div className={classes.root}>
            {lunchMatches.map((lunchMatch, index) =>
                <Accordion className={classes.accordion}
                           expanded={expanded === 'panel' + index}
                           onChange={handleChange('panel' + index)}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                        <Typography className={classes.heading}>{getFormattedDate(lunchMatch.matchDate)}</Typography>
                        {lunchMatch.profilePicUrl ?
                            <img className={classes.miniPicture}
                                 src={lunchMatch.profilePicUrl}
                                 alt="custom user avatar"/>
                            :
                            <img className={classes.miniPicture}
                                 src="https://res.cloudinary.com/hql1hvgt9/image/upload/v1595940220/happytoast_profilepicture_rhovob.png"
                                 alt="custom user avatar"/>}
                        <Typography
                            className={classes.secondaryHeading}>{lunchMatch.firstName}<br/>{lunchMatch.lastName}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <SvgIcon className={classes.icon} color="primary">
                                <FaEnvelope/>
                            </SvgIcon>
                            <a className={classes.link} href={`mailto:${lunchMatch.matchedUsername}`}>
                                {lunchMatch.matchedUsername}</a>
                            <br/><br/>
                            <SvgIcon className={classes.icon} color="primary">
                                <FaPhone/>
                            </SvgIcon>
                            <a className={classes.link} href={`tel:${lunchMatch.phoneNumber}`}>
                                {lunchMatch.phoneNumber}</a>
                            <br/><br/>
                            <SvgIcon className={classes.icon} color="primary">
                                <FaCalendarCheck/>
                            </SvgIcon>
                            Gemeinsame Lunchdays:
                            <ul>
                                {lunchMatch.commonLunchdays.sort(sortLunchdays).map(commonLunchday =>
                                    <li className={classes.lunchdayText}>{translateLunchday(commonLunchday)}</li>
                                )}
                            </ul>
                        </Typography>
                    </AccordionDetails>
                </Accordion>)}
        </div>
    );
}