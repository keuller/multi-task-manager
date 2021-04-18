
export function clearStorage() {
    window.localStorage.clear();
}

export function saveToken(token) {
    window.localStorage.setItem('token', token);
}

export function getToken() {
    return window.localStorage.getItem('token');
}

export function getUser() {
    const token = window.localStorage.getItem('token');
    if (token) {
        return JSON.parse(atob(token));
    }
    return {}
}
