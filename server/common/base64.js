
export function encode(value) {
    return Buffer.from(JSON.stringify(value)).toString('base64')
}

export function decode(value) {
    return JSON.parse(Buffer.from(value, 'base64').toString('utf8'));
}
