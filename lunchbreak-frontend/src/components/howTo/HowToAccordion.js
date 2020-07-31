import React, {useState} from "react";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Accordion from "@material-ui/core/Accordion";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    accordion: {
        boxShadow: "none"
    }
}));

export default function HowToAccordion({panelNumber, headingText, howToContent}) {
    const classes = useStyles();

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    return (
        <Accordion className={classes.accordion}
                   expanded={expanded === 'panel' + panelNumber}
                   onChange={handleChange('panel' + panelNumber)}>
            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                <Typography className={classes.accordionHeading}>{headingText}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {howToContent}
            </AccordionDetails>
        </Accordion>
    )
}
