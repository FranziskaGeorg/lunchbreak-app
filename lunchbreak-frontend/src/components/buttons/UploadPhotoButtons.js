import React, {useState} from "react";
import ButtonTurquoiseNoAction from "./ButtonTurquoiseNoAction";
import {getProfilePictureFetch, uploadProfilePictureFetch} from "../../utils/ProfileFetchUtils";
import convertImageToBase64 from "../../utils/ImageConversionUtils";
import ButtonTurquoise from "./ButtonTurquoise";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FaFolder, FaFileUpload} from "react-icons/all";
import InputTextFieldOutlined from "../inputFields/InputTextFieldOutlined";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(0.5)
    },
    uploadBox: {
        display: "flex",
        flexDirection: "column"
    }
}));

export default function UploadPhotoButtons({setProfilePicture}) {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();

    function handleFileSelection(event) {
        setSelectedFile(event.target.files[0]);
    }

    async function handleUploadClick() {
        const base64String = await convertImageToBase64(selectedFile);
        uploadProfilePictureFetch(base64String)
            .then(data => console.log(data));
        getProfilePictureFetch()
            .then(data => setProfilePicture(data));
    }

    return (
        <Box className={classes.uploadBox}>
            <label htmlFor="upload-photo">
                <input
                    style={{display: 'none'}}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={handleFileSelection}
                />
                <Box className={classes.nextTopic}>
                    <ButtonTurquoiseNoAction buttonSize="medium"
                                             buttonText="Profilbild auswählen"
                                             icon={<FaFolder/>}/>
                </Box>
                <Box className={classes.nextTopic}>
                    {selectedFile ?
                        <InputTextFieldOutlined value={selectedFile.name}/>
                        :
                        <InputTextFieldOutlined value="Noch kein Bild ausgewählt"/>
                    }
                </Box>
                <Box className={classes.nextTopic}>
                    <ButtonTurquoise handleClick={handleUploadClick}
                                     buttonSize="medium"
                                     buttonText="Profilbild hochladen"
                                     icon={<FaFileUpload/>}/>
                </Box>
            </label>
        </Box>
    )
}