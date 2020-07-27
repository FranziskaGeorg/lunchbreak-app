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
import UploadPhotoButton from "../buttons/UploadPhotoButton";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    },
    buttonBox: {
        display: "flex",
        flexDirection: "row",
        paddingTop: theme.spacing(2),
        justifyContent: "space-around"
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
            })
    }, []);

    function handleSave() {
        const profileInput = {firstName, lastName, job, subsidiary, favoriteFood, hobbies, username, phoneNumber, lunchdays}
        saveProfileDataFetch(profileInput)
            .then(data => console.log(data));
    }

    return (
        <Box>
            <Box>
                <Typography variant="h5">
                    Über Dich
                </Typography>
            </Box>
            <Box>
                <img src="http://res.cloudinary.com/hql1hvgt9/image/upload/w_150,h_100,c_fill,r_20/sample.png"
                     alt="cloudinary sample"/>
            </Box>
            <Box className={classes.nextTopic}>
                <UploadPhotoButton/>
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
            <Box className={classes.nextTopic}>
                <Typography variant="h5">
                    Kontaktdaten
                </Typography>
            </Box>
            <Box>
                <InputTextFieldDisabled fieldName="username" label="E-Mail-Adresse" value={username}
                                        setValue={setUsername}/>
            </Box>
            <Box>
                <InputTextField fieldName="phoneNumber" label="Handynummer" value={phoneNumber}
                                setValue={setPhoneNumber}/>
            </Box>
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
