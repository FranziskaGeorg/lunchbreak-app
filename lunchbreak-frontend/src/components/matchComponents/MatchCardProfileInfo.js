import React from "react";
import SvgIcon from "@material-ui/core/SvgIcon";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(1),
        fontSize: "20px"
    }
}));

export default function MatchCardProfileInfo({icon, profileInput}) {
    const classes = useStyles();

    return (
        <>
            <SvgIcon className={classes.icon} color="primary">
                {icon}
            </SvgIcon>
            <Typography variant="body2">
                {profileInput}
            </Typography>
        </>
    )
}
