import { getUserService } from '../common/factory.js';

/*
 * Register all route handlers for User resource
*/
const userService = getUserService();

export function registerUserRoutes(app) {
    app.post('/auth', auth);
    app.post('/register', registerUser);
    app.get('/v1/users', listUsers);
}

/*
 * Authtentication user handler
*/
async function auth(request, _reply) {
    return await userService.auth(request.body);
}

async function registerUser(request, _reply) {
    return await userService.register(request.body);
}

async function listUsers(_request, _reply) {
    return await userService.getAll();
}
