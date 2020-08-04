import {getJWTToken} from "./JWTUtils";

export async function initProfileDataFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/profile", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of user profile failed")
    }
    return await response.json();
}

export async function saveProfileDataFetch(profileData) {
    const token = getJWTToken();
    const response = await fetch("/api/profile", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData)
    });
    if (response.status !== 200) {
        throw new Error("Saving profile data failed");
    }
    return await response.text();
}

export async function getProfileStatusFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/profile/status", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of profile status failed")
    }
    const result = await response.text();
    return (result === 'true');
}

export async function uploadProfilePictureFetch(imageUrl) {
    const token = getJWTToken();
    const response = await fetch("/api/profile/picture", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: imageUrl
    });
    if (response.status !== 200) {
        throw new Error("Uploading profile picture failed");
    }
    return await response.text();
}

export async function getProfilePictureFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/profile/picture", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of profile picture failed")
    }
    return await response.text();
}

export async function deleteProfilePictureFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/profile/picture", {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Deletion of profile picture failed")
    }
}

export async function deleteProfileFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/profile", {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Deletion of user profile failed")
    }
}