import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import InputTextField from "../inputFields/InputTextField";
import DropdownField from "../inputFields/DropdownField";
import Typography from "@material-ui/core/Typography";
import {initProfileDataFetch, saveProfileDataFetch} from "../../utils/ProfileFetchUtils";
import InputTextFieldDisabled from "../inputFields/InputTextFieldDisabled";
import ButtonYellow from "../buttons/ButtonYellow";
import {useHistory} from "react-router";
import CheckboxForm from "../inputFields/CheckboxForm";
import Box from "@material-ui/core/Box";
import PhotoUploadForm from "./PhotoUploadForm";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        paddingTop: theme.spacing(2),
        justifyContent: "space-around"
    },
    profileBox: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        '@media (max-width: 599px)': {
            maxWidth: "100%"
        },
        '@media (min-width:600px)': {
            width: "75vw",
            maxWidth: "1000px"
        }
    },
    divider: {
        marginTop: theme.spacing(2),
        backgroundColor: "#eef5f6",
        border: "none",
        height: "1px"
    },
    profilePicture: {
        width: "100%",
        maxWidth: "300px",
        borderRadius: "50%",
        objectFit: "cover",
        boxShadow: "0px 2px 5px 0px #989898"
    }
}));

export default function ProfileForm() {
    const classes = useStyles();

    const history = useHistory();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [job, setJob] = useState("");
    const [subsidiary, setSubsidiary] = useState("");
    const [location, setLocation] = useState("");
    const [favoriteFood, setFavoriteFood] = useState("");
    const [hobbies, setHobbies] = useState("");
    const [username, setUsername] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [lunchdays, setLunchdays] = useState({
        monday: false,
        tuesday: false,
        wednesday: false,
        thursday: false,
        friday: false
    })
    const [profilePicture, setProfilePicture] = useState();

    useEffect(() => {
        initProfileDataFetch()
            .then(data => {
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setUsername(data.username);
                setJob(data.job);
                setSubsidiary(data.subsidiary);
                setLocation(data.location);
                setFavoriteFood(data.favoriteFood);
                setHobbies(data.hobbies);
                setPhoneNumber(data.phoneNumber);
                setLunchdays(data.lunchdays);
                if (!data.profilePicUrl) {
                    setProfilePicture("https://res.cloudinary.com/hql1hvgt9/image/upload/v1595940220/happytoast_profilepicture_rhovob.png");
                } else {
                    setProfilePicture(data.profilePicUrl);
                }
            })
    }, [profilePicture]);

    function handleSave() {
        const profileInput = {
            firstName,
            lastName,
            job,
            subsidiary,
            location,
            favoriteFood,
            hobbies,
            username,
            phoneNumber,
            lunchdays
        }
        saveProfileDataFetch(profileInput)
            .then(data => console.log(data));
    }

    return (
        <Box className={classes.profileBox}>
            <Box>
                <img className={classes.profilePicture} src={profilePicture} alt="custom user avatar"/>
            </Box>
            <Box className={classes.nextTopic}>
                <Typography variant="h5">
                    Dein Profilbild
                </Typography>
            </Box>
            <Box className={classes.nextTopic}>
                <PhotoUploadForm setProfilePicture={setProfilePicture}/>
            </Box>
            <Divider className={classes.divider} variant="fullWidth"/>
            <Box className={classes.nextTopic}>
                <Typography variant="h5">
                    Über Dich
                </Typography>
            </Box>
            <Box className={classes.nextTopic}>
                <InputTextField fieldName="firstName" label="Vorname" value={firstName} setValue={setFirstName}/>
            </Box>
            <Box>
                <InputTextField fieldName="lastName" label="Nachname" value={lastName} setValue={setLastName}/>
            </Box>
            <Box>
                <InputTextField fieldName="job" label="Tätigkeit bei CONET" value={job} setValue={setJob}/>
            </Box>
            <Box>
                <DropdownField subsidiary={subsidiary} setSubsidiary={setSubsidiary}/>
            </Box>
            <Box>
                <InputTextField fieldName="location" label="Standort (Hennef, Bonn, ...)" value={location} setValue={setLocation}/>
            </Box>
            <Box>
                <InputTextField fieldName="favoriteFood" label="Lieblingsessen(srichtung)"
                                value={favoriteFood} setValue={setFavoriteFood}/>
            </Box>
            <Box>
                <InputTextField fieldName="hobbies" label="Hobbies oder Interessen" value={hobbies}
                                setValue={setHobbies}/>
            </Box>
            <Divider className={classes.divider} variant="fullWidth"/>
            <Box className={classes.nextTopic}>
                <Typography variant="h5">
                    Kontaktdaten
                </Typography>
            </Box>
            <Box className={classes.nextTopic}>
                <InputTextFieldDisabled fieldName="username" label="E-Mail-Adresse" value={username}
                                        setValue={setUsername}/>
            </Box>
            <Box>
                <InputTextField fieldName="phoneNumber" label="Handynummer" value={phoneNumber}
                                setValue={setPhoneNumber}/>
            </Box>
            <Divider className={classes.divider} variant="fullWidth"/>
            <Box className={classes.nextTopic}>
                <Typography variant="h5">
                    Deine Lunchdays
                </Typography>
            </Box>
            <Box>
                <CheckboxForm lunchdays={lunchdays} setLunchdays={setLunchdays}/>
            </Box>
            <Box className={classes.buttonBox}>
                <ButtonYellow handleClick={() => history.push("/dailymatch")}
                              buttonSize="large"
                              buttonText="Verwerfen"/>
                <ButtonYellow handleClick={handleSave}
                              buttonSize="large"
                              buttonText="Speichern"/>
            </Box>
        </Box>
    )
}
