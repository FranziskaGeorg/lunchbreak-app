import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import byeLogo from "../images/happytoast_bye.png";

const useStyles = makeStyles((theme) => ({
    overallBox: {
        display: "flex",
        justifyContent: "center",
        width: "100vw",
        minHeight: "95%"
    },
    bigBox: {
        flexGrow: 1,
        maxWidth: "1000px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        borderRadius: "10px",
        padding: theme.spacing(4)
    },
    logoutBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        '@media (min-width: 412px, max-width: 599px)': {
            minWidth: "400px"
        },
        '@media (min-width:600px)': {
            maxWidth: "500px"
        }
    },
    logo: {
        width: '60%',
        height: '60%'
    },
    logoPlacement: {
        paddingTop: theme.spacing(3),
        textAlign: "center"
    }
}));

export default function LogoutPage() {
    const classes = useStyles();

    return (
        <Box className={classes.overallBox}>
            <Box className={classes.bigBox}>
                <Box className={classes.logoutBox}>
                    <Box className={classes.logoPlacement}>
                        <img src={byeLogo} alt="Lunchbreak logo for logout" className={classes.logo}/>
                    </Box>
                    <Box>
                        <Typography variant="h4" color="primary" align="center">
                            Komm bald wieder!
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}


