import React from "react";
import Box from "@material-ui/core/Box";
import InputTextField from "../inputFields/InputTextField";
import DropdownField from "../inputFields/DropdownField";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(2)
    }
}));

export default function ProfileFormAboutFields({firstName, setFirstName, lastName, setLastName, job, setJob,
                                                   subsidiary, setSubsidiary, location, setLocation,
                                                   favoriteFood, setFavoriteFood, hobbies, setHobbies}) {
    const classes = useStyles();

    return (
        <>
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
                <InputTextField fieldName="location" label="Standort (Hennef, Bonn, ...)" value={location}
                                setValue={setLocation}/>
            </Box>
            <Box>
                <InputTextField fieldName="favoriteFood" label="Lieblingsessen(srichtung)"
                                value={favoriteFood} setValue={setFavoriteFood}/>
            </Box>
            <Box>
                <InputTextField fieldName="hobbies" label="Hobbies oder Interessen" value={hobbies}
                                setValue={setHobbies}/>
            </Box>
        </>
    )
}