import React, {useState} from "react";
import ButtonTurquoiseNoAction from "./ButtonTurquoiseNoAction";
import {uploadProfilePictureFetch} from "../../utils/ProfileFetchUtils";
import convertImageToBase64 from "../../utils/ImageConversionUtils";
import TextField from "@material-ui/core/TextField";
import ButtonTurquoise from "./ButtonTurquoise";

export default function UploadPhotoButton() {
    const [selectedFile, setSelectedFile] = useState();

    function handleFileSelection(event) {
        setSelectedFile(event.target.files[0]);
    }

    async function handleUploadClick() {
        const base64String = await convertImageToBase64(selectedFile);
        uploadProfilePictureFetch(base64String)
            .then(data => console.log(data));
    }

    return (
        <label htmlFor="upload-photo">
            <input
                style={{display: 'none'}}
                id="upload-photo"
                name="upload-photo"
                type="file"
                onChange={handleFileSelection}
            />
            <ButtonTurquoiseNoAction buttonSize="medium"
                                     buttonText="Profilbild auswählen"/>
            {selectedFile ?
                <TextField variant="outlined"
                           value={selectedFile.name}
                           disabled="true"/>
                :
                <TextField variant="outlined"
                           value="Noch kein Bild ausgewählt"
                           disabled="true"/>
            }
            <ButtonTurquoise handleClick={handleUploadClick}
                             buttonSize="medium"
                             buttonText="Profilbild hochladen"/>
        </label>
    )
}