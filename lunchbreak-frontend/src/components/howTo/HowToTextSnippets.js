import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaCalendarAlt, FaUser, FaUtensils} from "react-icons/all";
import makeStyles from "@material-ui/core/styles/makeStyles";

export function AboutText() {
    return (
        <Typography>
            Ein Mittagessen mit Kollegen - "vor Corona" war das noch ganz normal.
            Mit zunehmender Home-Office-Nutzung treffen Kollegen jedoch immer seltener
            persönlich aufeinander. Und wenn man dann doch mal im Büro ist,
            hat man unter Umständen keine Ahnung, wer vielleicht auch gerade in der Nähe ist
            und Lust auf einen gemeinsamen Lunch hätte.
            <br/><br/>
            Mit dieser App findest Du das heraus! Du matchst ganz einfach mit Kollegen,
            die an denselben Tagen wie Du verfügbar sind und auch keine Lust mehr auf ein
            einsames Mittagessen im stillen Kämmerlein haben. Gut essen und dabei mit alten
            und neuen Kollegen connecten - das ist der Spirit von LunchBreak.
        </Typography>
    )
}

const useStyles = makeStyles((theme) => ({
    stepText: {
        color: "#009899",
        fontWeight: "bold"
    },
    link: {
        color: "#dfa528",
        fontWeight: "bold",
        textTransform: "uppercase",
        textDecoration: "none",
        '&:hover': {
            color: "#dfa528",
            textDecoration: "none"
        }
    },
    icon: {
        fontSize: "18px",
        position: "relative",
        top: "5px",
        marginLeft: theme.spacing(0.5)
    }
}))

export function HowToSteps() {
    const classes = useStyles();

    return (
        <Typography>
            <div className={classes.stepText}>STEP 1: Profil ausfüllen</div>
            <p>
                Fülle nach dem ersten Einloggen Dein <Link className={classes.link} href="/profile">
                Nutzerprofil
                <SvgIcon className={classes.icon} color="secondary">
                    <FaUser/>
                </SvgIcon>
            </Link>
                aus, damit Deine Kollegen etwas mehr
                über Dich erfahren.
                Folgende Informationen werden auf Deiner Match Card für alle Nutzer angezeigt:
                <ul>
                    <li>Vorname</li>
                    <li>Tätigkeit und CONET-Gesellschaft</li>
                    <li>Lieblingsessen bzw. -essensrichtung</li>
                    <li>Hobbies oder Interessen</li>
                </ul>
            </p>
            <div className={classes.stepText}>STEP 2: Matches finden</div>
            <p>
                Auf der <Link className={classes.link} href="/dailymatch">
                Daily Match Page
                <SvgIcon className={classes.icon} color="secondary">
                    <FaUtensils/>
                </SvgIcon>
            </Link>
                wird Dir ein Kollege angezeigt, dessen Lunch Days (also Tage,
                an denen sie oder er für einen gemeinsamen Lunch zur Verfügung steht) sich mit Deinen überschneiden.
                Du hast nun die Wahl, die angezeigte Match Card entweder neu zu mischen oder aber direkt auf "Lunchen"
                zu klicken.
            </p>
            <div className={classes.stepText}>STEP 3: Lunchen!</div>
            <p>
                Sobald Dein Lunch Match auf Deiner Match Card ebenfalls "Lunchen" gewählt hat, erscheint ein Popup mit
                den
                Kontaktdaten Deines Matches. Jetzt muss nur noch ein Termin vereinbart werden!
                <br/><br/>
                In Deinem <Link className={classes.link} href="/history">
                Matchverzeichnis
                <SvgIcon className={classes.icon} color="secondary">
                    <FaCalendarAlt/>
                </SvgIcon>
            </Link>
                kannst Du die Kontaktdaten Deiner Matches und eure gemeinsamen Lunch Days aber auch
                später noch einmal anschauen.
            </p>
        </Typography>
    )
}