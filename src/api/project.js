import { getToken } from '../util/persistence';
import { getBaseUrl } from './client';

const basePath = `${getBaseUrl()}/v1/projects`;

function geHeaders() {
    return new Headers({ 'Content-Type': 'application/json', 'Authorization': getToken() });
}

export async function fetchProjects() {
    try {
        let opts = { method:'GET', headers: geHeaders() }
        const response = await fetch(basePath, opts)
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function createProject(title) {
    try {
        const data = JSON.stringify({ title });
        let opts = { method:'POST', body: data, headers: geHeaders() }
        const response = await fetch(basePath, opts)
        const respData = await response.json();
        if (respData.status === 'OK') {
            return { id: respData.projectId, title };
        }
    } catch (err) {
        console.error(err);
        return {};
    }
}

export async function editProject(id, title) {
    try {
        const data = JSON.stringify({ title });
        const opts = { method:'PUT',  body: data, headers: geHeaders() }
        const response = await fetch(`${basePath}/${id}`,opts)
        const respData = await response.json();
        return respData;
    } catch (err) {
        console.error(err);
        return 'Operation has failed. Try again.';
    }
}

export async function removeProject(id) {
    try {
        let opts = { method:'DELETE', headers: geHeaders() }
        const response = await fetch(`${basePath}/${id}`, opts)
        const respData = await response.json();
        return respData;
    } catch (err) {
        console.error(err);
        return 'Operation has failed. Try again.';
    }
}
