
export function getBaseUrl() {
    const port = window.location.port;
    if (port != 80) {return window.location.protocol + '//' + window.location.hostname + ':' + port;}
    return window.location.protocol + '//' + window.location.hostname;
}
