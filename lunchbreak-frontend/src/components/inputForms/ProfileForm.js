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
import UploadPhotoButtons from "../buttons/UploadPhotoButtons";
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
    divider: {
        marginTop: theme.spacing(2),
        backgroundColor: "#eef5f6",
        border: "none",
        height: "1px"
    }
}));

export default function ProfileForm() {
    const classes = useStyles();

    const history = useHistory();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [job, setJob] = useState('');
    const [subsidiary, setSubsidiary] = useState('');
    const [favoriteFood, setFavoriteFood] = useState('');
    const [hobbies, setHobbies] = useState('');
    const [username, setUsername] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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
                setFavoriteFood(data.favoriteFood);
                setHobbies(data.hobbies);
                setPhoneNumber(data.phoneNumber);
                setLunchdays(data.lunchdays);
                setProfilePicture(data.profilePicUrl);
            })
    }, [profilePicture]);

    function handleSave() {
        const profileInput = {firstName, lastName, job, subsidiary, favoriteFood, hobbies, username, phoneNumber, lunchdays}
        saveProfileDataFetch(profileInput)
            .then(data => console.log(data));
    }

    return (
        <Box>
            <Box>
                <Typography variant="h5">
                    Dein Profilbild
                </Typography>
            </Box>
            <Box className={classes.nextTopic}>
                <img src={profilePicture} alt="profile picture"/>
            </Box>
            <Box className={classes.nextTopic}>
                <UploadPhotoButtons setProfilePicture={setProfilePicture}/>
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
                <InputTextField fieldName="favoriteFood" label="Lieblingsessen bzw. -essensrichtung"
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
