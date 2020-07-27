import React, {useState} from "react";
import ButtonTurquoise from "./ButtonTurquoise";
import {saveProfilePictureFetch} from "../../utils/ProfileFetchUtils";

export default function UploadPhotoButton() {
    const [selectedFile, setSelectedFile] = useState();

    function handleFileSelection(event) {
        setSelectedFile(event.target.files[0]);
    }

    function handleUploadClick() {
        saveProfilePictureFetch(selectedFile)
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
            <ButtonTurquoise handleClick={handleUploadClick()}
                             buttonSize="medium"
                             buttonText="Profilbild hochladen"/>
        </label>
    )
}