import { getToken } from '../util/persistence';
import { getBaseUrl } from './client';

const basePath = `${getBaseUrl()}/v1/projects`;

function geHeaders() {
    return new Headers({ 'Content-Type': 'application/json', 'Authorization': getToken() });
}

export async function fetchTasks(projectId) {
    try {
        const opts = { method:'GET', headers: geHeaders() }
        const response = await fetch(`${basePath}/${projectId}`, opts)
        return await response.json();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export async function createTask(projectId, description) {
    try {
        const data = JSON.stringify({ description })
        const opts = { method:'POST', body: data, headers: geHeaders() }
        const response = await fetch(`${basePath}/${projectId}/task`, opts)
        return await response.json();
    } catch (err) {
        console.error(err);
        return {};
    }
}

export async function updateTask(projectId, taskId, description) {
    try {
        const data = JSON.stringify({ taskId, description })
        const opts = { method:'PUT', body: data, headers: geHeaders() }
        const response = await fetch(`${basePath}/${projectId}/task`, opts)
        return await response.json();
    } catch (err) {
        console.error(err);
        return {};
    }
}

export async function finishTask(projectId, taskId) {
    try {
        const data = JSON.stringify({ taskId })
        const opts = { method:'PATCH', body: data, headers: geHeaders() }
        const response = await fetch(`${basePath}/${projectId}/task`, opts)
        return await response.json();
    } catch (err) {
        console.error(err);
        return {};
    }
}

export async function removeTask(projectId, taskId) {
    try {
        const opts = { method:'DELETE', headers: geHeaders() }
        const response = await fetch(`${basePath}/${projectId}/task/${taskId}`, opts)
        return await response.json();
    } catch (err) {
        console.error(err);
        return {};
    }
}
