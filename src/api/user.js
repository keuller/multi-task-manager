import { getBaseUrl } from './client';
import { saveToken } from '../util/persistence';

export async function registerUser(user) {
    let rHeaders = new Headers({ 'Content-Type': 'application/json' });
    let fData = JSON.stringify(user);
    let opts = { method:'POST', body: fData, headers: rHeaders }
    let data = await fetch(getBaseUrl() + '/register', opts).then(resp => resp.json());

    if (data.status == 'FAIL') {
        return data.message;
    }
    
    return '';
}

export async function authenticate(email, password) {
    let rHeaders = new Headers({ 'Content-Type': 'application/json' });
    let fData = JSON.stringify({ email, password });
    let opts = { method:'POST', body: fData, headers: rHeaders }
    let data = await fetch(getBaseUrl() + '/auth', opts).then(resp => resp.json());

    if (data.status == 'INVALID') {
        return data.message;
    }
    
    saveToken(data.token);
    return '';
}
