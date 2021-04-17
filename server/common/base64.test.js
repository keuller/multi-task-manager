import { expect, test } from "@jest/globals";
import { decode, encode } from './base64.js';

test('encode value into base64', () => {
    let b64 = encode({ status: 'OK' });
    expect(b64).toEqual('eyJzdGF0dXMiOiJPSyJ9');
});

test('decode base64 value', () => {
    let val = decode('eyJzdGF0dXMiOiJPSyJ9');
    expect(val).toStrictEqual({ status: 'OK' });
});
