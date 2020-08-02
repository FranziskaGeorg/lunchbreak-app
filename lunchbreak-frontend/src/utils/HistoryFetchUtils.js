import {getJWTToken} from "./JWTUtils";

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

export async function checkIfMatchInHistoryIsMutualFetch(matchedUsername) {
    const token = getJWTToken();
    const response = await fetch(`/api/history/${matchedUsername}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of match status failed")
    }
    const result = await response.text();
    return (result === 'true');
}