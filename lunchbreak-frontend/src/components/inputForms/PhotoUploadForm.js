import React, {useState} from "react";
import ButtonTurquoiseNoAction from "../buttons/ButtonTurquoiseNoAction";
import {
    deleteProfilePictureFetch,
    getProfilePictureFetch,
    uploadProfilePictureFetch
} from "../../utils/ProfileFetchUtils";
import convertImageToBase64 from "../../utils/ImageConversionUtils";
import ButtonTurquoise from "../buttons/ButtonTurquoise";
import Box from "@material-ui/core/Box";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {FaFolder, FaFileUpload, FaTrash} from "react-icons/all";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";

const useStyles = makeStyles((theme) => ({
    nextTopic: {
        paddingTop: theme.spacing(0.5)
    },
    uploadBox: {
        display: "flex",
        flexDirection: "column"
    },
    dialogBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: theme.spacing(2)
    },
    pictureBox: {
        width: "300px",
        height: "300px",
        margin: theme.spacing(2)
    },
    previewPic: {
        borderRadius: "5px",
        objectFit: "cover",
        width: "100%",
        height: "100%"
    }
}));

export default function PhotoUploadForm({setProfilePicture}) {
    const classes = useStyles();
    const [selectedFile, setSelectedFile] = useState();

    function handleFileSelection(event) {
        setSelectedFile(event.target.files[0]);
    }

    async function handleUploadClick() {
        const base64String = await convertImageToBase64(selectedFile);
        uploadProfilePictureFetch(base64String)
            .then(data => console.log(data))
            .then(() => getProfilePictureFetch()
                .then(data => setProfilePicture(data)))
            .then(() => setSelectedFile(undefined)
            );
    }

    function handleFileDeletion(event) {
        deleteProfilePictureFetch()
            .then(data => console.log(data));
        setProfilePicture("");
    }

    function PopupPicturePreview() {
        const previewUrl = URL.createObjectURL(selectedFile);

        function handleClosePopup() {
            setSelectedFile(undefined);
        }

        return (
            <Dialog
                open={selectedFile}
                onClose={handleClosePopup}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <Box className={classes.dialogBox}>
                    <Box>
                        <Typography variant="h6" align="center">
                            Bildvorschau
                        </Typography>
                    </Box>
                    <Box className={classes.pictureBox}>
                        <img className={classes.previewPic} src={previewUrl} alt="user avatar preview"/>
                    </Box>
                    <Box className={classes.nextTopic}>
                        <ButtonTurquoise handleClick={handleUploadClick}
                                         buttonSize="medium"
                                         buttonText="Profilbild hochladen"
                                         icon={<FaFileUpload/>}/>
                    </Box>
                    <Box className={classes.nextTopic}>
                        <ButtonTurquoise handleClick={handleClosePopup}
                                         buttonSize="medium"
                                         buttonText="Abbrechen"
                                         icon=""/>
                    </Box>
                </Box>
            </Dialog>
        )
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
                {selectedFile && <PopupPicturePreview/>}
                <Box className={classes.nextTopic}>
                    <ButtonTurquoise handleClick={handleFileDeletion}
                                     buttonSize="medium"
                                     buttonText="Profilbild löschen"
                                     icon={<FaTrash/>}/>
                </Box>
            </label>
        </Box>
    )
}