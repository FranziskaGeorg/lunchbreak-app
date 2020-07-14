export async function performLogin(username, password) {
    const response = await fetch('/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });
    if (response.status !== 200) {
        throw new Error(`Login failed: ${response.statusText}`);
    }
    return await response.text();
}

export async function performRegistration(registrationData) {
    const response = await fetch('/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
    });
    if (response.status !== 200) {
        throw new Error(`Registration failed: ${response.statusText}`);
    }
    return await response.text();
}