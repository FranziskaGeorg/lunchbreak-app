import React from "react";
import ButtonTurquoise from "../buttons/ButtonTurquoise";

export default function UploadPhotoField() {
    return (
        <label htmlFor="upload-photo">
            <input
                style={{ display: 'none' }}
                id="upload-photo"
                name="upload-photo"
                type="file"
            />
            <ButtonTurquoise buttonSize="medium" buttonText="Profilbild hochladen"/>
        </label>
    )
}