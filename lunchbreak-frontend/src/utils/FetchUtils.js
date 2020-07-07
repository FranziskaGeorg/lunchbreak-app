export async function getRandomUserFetch() {
    const response = await fetch("/api/dailymatch");
    if (response.status !== 200) {
        throw new Error("Fetch of random user failed :-(")
    }
    return await response.json();
}