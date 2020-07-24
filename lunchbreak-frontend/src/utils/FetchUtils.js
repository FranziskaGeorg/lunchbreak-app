import {getJWTToken} from "./JWTUtils";

export async function getMatchingColleagueFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/dailymatch", {
        method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of daily match failed")
    }
    return await response.json();
}

export async function saveLunchMatchFetch(matchedUsername) {
    const token = getJWTToken();
    const response = await fetch("/api/dailymatch", {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(matchedUsername)
    });
    if (response.status !== 200) {
        throw new Error("Saving profile data failed");
    }
    return await response.text();
}

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

export async function getLunchMatchesFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/history", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of lunch matches failed")
    }
    return await response.json();
}