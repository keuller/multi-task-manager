import { getProjectService, getTaskService } from '../common/factory.js';
import { decode } from '../common/base64.js';
import { ok, fail, notFound } from '../common/message.js';

/*
 * Register all route handlers for User resource
*/
const projectService = getProjectService();
const taskService = getTaskService();

export function registerProjectRoutes(app) {
    app.post('/v1/projects', create);
    app.put('/v1/projects/:id', update);
    app.get('/v1/projects/:id', getById);
    app.get('/v1/projects', getByUser);
    app.delete('/v1/projects/:id', remove);

    app.post('/v1/projects/:id/task', addTask);
    app.put('/v1/projects/:id/task', updateTask);
    app.patch('/v1/projects/:id/task', finishTask);
    app.delete('/v1/projects/:id/task/:tid', removeTask);
}

async function create(request) {
    const title = request.body.title;
    let token = decode(request.headers['authorization']);
    return await projectService.addProject(token.id, title);
}

async function update(request) {
    const id = request.params['id'];
    const title = request.body['title'];
    return await projectService.updateTitle(id, title);
}

function getById(request) {
    const projectId = request.params['id'];
    return projectService.getProject(projectId)
        .then(prj => {
            return taskService.getTasks(projectId)
                .then(tasks => Object.assign(prj, { tasks }))
        })
        .catch(_err => notFound('Project not found.'));
}

async function getByUser(request) {
    const token = request.context['token'];
    return await projectService.getProjectsByUser(token.id);
}

async function remove(request) {
    const token = request.context['token'];
    return await projectService.remove(token.id, request.params['id']);
}

function addTask(request) {
    const projectId = request.params['id'];
    const description = request.body['description'] || '';
    return projectService.getProject(projectId)
        .then(prj => taskService.addTask(prj.id, description))
        .catch(_err => fail('Cannot create a task due invalid project.'));
}

function updateTask(request) {
    const projectId = request.params['id'];
    const task = request.body || {};
    return taskService.updateTask(projectId, task);
}

function finishTask(request) {
    const projectId = request.params['id'];
    const taskId = request.body['taskId'] || '';
    return taskService.finish(projectId, taskId);
}

function removeTask(request) {
    const projectId = request.params['id'];
    const taskId = request.params['tid'];
    return taskService.remove(projectId, taskId);
}
