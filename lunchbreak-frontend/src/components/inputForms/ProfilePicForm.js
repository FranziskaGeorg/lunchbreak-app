import React, {useRef, useState} from "react";
import {FaFileUpload, FaFolder, FaTrash} from "react-icons/all";
import Dialog from "@material-ui/core/Dialog";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import ButtonTurquoise from "../buttons/ButtonTurquoise";
import convertImageToBase64 from "../../utils/ImageConversionUtils";
import {
    deleteProfilePictureFetch,
    getProfilePictureFetch,
    uploadProfilePictureFetch
} from "../../utils/ProfileFetchUtils";
import makeStyles from "@material-ui/core/styles/makeStyles";

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
        width: "250px",
        height: "250px",
        margin: theme.spacing(2)
    },
    previewPic: {
        width: "250px",
        height: "250px",
        borderRadius: "50%",
        objectFit: "cover"
    },
    fileSelectionButton: {
        fontFamily: "Arimo",
        fontWeight: "bold",
        textTransform: "none"
    }
}));

export default function ProfilePicForm({setProfilePicture}) {
    const classes = useStyles();

    const inputFile = useRef(null)

    const [selectedFile, setSelectedFile] = useState();

    function showFileBrowser() {
        inputFile.current.click();
    }

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

    function handleFileDeletion() {
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
            <input
                style={{display: 'none'}}
                id="photo"
                type="file"
                ref={inputFile}
                onChange={handleFileSelection}
                onClick={event => event.target.value = null}/>
            <label htmlFor="photo">
                <Box className={classes.nextTopic}>
                    <ButtonTurquoise handleClick={showFileBrowser}
                                     buttonSize="small"
                                     buttonText="Bild auswählen"
                                     icon={<FaFolder/>}/>
                </Box>
                {selectedFile && <PopupPicturePreview/>}
                <Box className={classes.nextTopic}>
                    <ButtonTurquoise handleClick={handleFileDeletion}
                                     buttonSize="small"
                                     buttonText="Bild löschen"
                                     icon={<FaTrash/>}/>
                </Box>
            </label>
        </Box>
    )
}