import projectRepo from './project.repo.js';
import ProjectService from "./project.service.js";
import { decode } from '../common/base64.js';

/*
 * Register all route handlers for User resource
*/
const projectService = new ProjectService(projectRepo);

export function registerProjectRoutes(app) {
    app.post('/v1/projects', create);
    app.put('/v1/projects/:id', update);
    app.get('/v1/projects/:id', getById);
    app.get('/v1/projects', getByUser);
    app.delete('/v1/projects/:id', remove);
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

function getById(request, reply) {
    throw new Error('Not implemented yet');
}

async function getByUser(request) {
    let token = decode(request.headers['authorization']);
    return await projectService.getProjectsByUser(token.id);
}

async function remove(request) {
    return await projectService.remove(request.params['id']);
}
