
export function ok(msg, detail) {
    return _msg('OK', msg, detail);
}

export function fail(msg, detail) {
    return Promise.reject(_msg('FAIL', msg, detail));
}

export function notFound(msg) {
    return Promise.reject(_msg('NOT_FOUND', msg));
}

function _msg(code, msg, detail) {
    if (detail) {
        return Object.assign({ status: code, message: msg }, detail);
    }
    return { status: code, message: msg };
}
