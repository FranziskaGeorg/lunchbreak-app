import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaCalendarCheck, FaEnvelope, FaPhone} from "react-icons/all";
import {sortLunchdays, translateLunchday} from "../../utils/LunchDayUtils";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    link: {
        color: "#009899",
        textDecoration: "none",
        '&:hover': {
            color: "#dfa528"
        }
    },
    icon: {
        marginRight: theme.spacing(1),
        fontSize: "20px",
        position: "relative",
        top: "5px"
    },
    lunchdayText: {
        marginLeft: theme.spacing(0.5)
    }
}));

export default function HistoryDetails({lunchMatch}) {
    const classes = useStyles();

    return (
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
    )
}