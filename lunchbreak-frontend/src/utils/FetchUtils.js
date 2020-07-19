import {getJWTToken} from "./JWTUtils";

export async function getRandomColleagueFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/dailymatch", {
        method: 'GET',
            headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of random user failed")
    }
    return await response.json();
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