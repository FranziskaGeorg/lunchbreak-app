export default async function convertImageToBase64(selectedFile) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);

        reader.onload = function () {
            const base64String = reader.result;
            resolve(base64String);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            reject(error);
        };
    })
}


