import React from "react";
import Dialog from "@material-ui/core/Dialog";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaPhone, FaEnvelope} from "react-icons/all";

const useStyles = makeStyles((theme) => ({
    dialogBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(4)
    },
    nextTopic: {
        paddingTop: theme.spacing(2)
    },
    backToMatchButton: {
        fontFamily: "Arimo",
        textTransform: "none",
        fontSize: "16px"
    },
    emoji: {
        fontSize: "200%"
    },
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
    }
}));

export default function PopupLunchMatch({showPopup, setShowPopup, matchData}) {
    const classes = useStyles();

    function handleClosePopup() {
        setShowPopup(false);
    }

    return (
        <Dialog
            open={showPopup}
            onClose={handleClosePopup}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <Box className={classes.dialogBox}>
                <Box>
                    <span className={classes.emoji}
                          role="img"
                          aria-labelledby="party-emoji">
                        🎉
                    </span>
                </Box>
                <Typography variant="h6" align="center">
                    Neues Lunch-Match!
                </Typography>
                <Box className={classes.nextTopic}>
                    <Typography variant="body1">
                        Kontaktiere {matchData.firstName}, um einen Termin zum Lunchen zu vereinbaren.
                        <br/><br/>
                        <SvgIcon className={classes.icon} color="primary">
                            <FaEnvelope/>
                        </SvgIcon>
                        <a className={classes.link} href={`mailto:${matchData.username}`}>
                        {matchData.username}</a>
                        <br/><br/>
                        <SvgIcon className={classes.icon} color="primary">
                            <FaPhone/>
                        </SvgIcon>
                        <a className={classes.link} href={`tel:${matchData.phoneNumber}`}>
                         {matchData.phoneNumber}</a>
                        <br/><br/>
                        Du kannst die Kontaktdaten deines Matches auch jederzeit zu einem späteren Zeitpunkt in deiner
                        Match-Historie anschauen.
                    </Typography>
                </Box>
                <Box className={classes.nextTopic}>
                    <Button className={classes.backToMatchButton}
                            onClick={handleClosePopup}
                            color="primary">
                        Weitere Matches finden
                    </Button>
                </Box>
            </Box>
        </Dialog>
    )
}