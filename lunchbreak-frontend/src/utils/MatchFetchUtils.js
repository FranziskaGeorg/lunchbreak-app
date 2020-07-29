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

export async function checkIfMatchIsMutualFetch() {
    const token = getJWTToken();
    const response = await fetch("/api/dailymatch/mutual", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of daily match status failed")
    }
    const result = await response.text();
    return (result === 'true');
}

/*export async function checkIfMatchIsMutualFetch(matchedUsername) {
    const token = getJWTToken();
    const response = await fetch("/api/dailymatch/{matchedUsername}", {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    if (response.status !== 200) {
        throw new Error("Fetch of daily match status failed")
    }
    const result = await response.text();
    return (result === 'true');
}*/
