import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import SvgIcon from "@material-ui/core/SvgIcon";
import {FaCalendarAlt, FaUser, FaUtensils} from "react-icons/all";
import makeStyles from "@material-ui/core/styles/makeStyles";

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

export function Imprint() {
    const classes = useStyles();

    return (
        <Typography>
            <div className={classes.stepText}>Angaben gemäß § 5 TMG</div><br/>
            Franziska Georg<br/>
            Corkstraße 18<br/>
            51103 Köln
            <br/><br/>
            <div className={classes.stepText}>Vertreten durch:</div>
            Franziska Georg
            <br/><br/>
            <div className={classes.stepText}>Kontakt:</div>
            franzi.georg@web.de
            <br/><br/>
            <div className={classes.stepText}>Haftungsausschluss:</div><br/>
            <div className={classes.stepText}>Haftung für Inhalte</div>
            Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            <br/><br/>
            <div className={classes.stepText}>Urheberrecht</div>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            <br/><br/>
            <div className={classes.stepText}>Datenschutz</div>
            Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
            Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
            Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.
        </Typography>
    )
}