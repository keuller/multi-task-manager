import userRepo from './user.repo.js';
import UserService from './user.service.js';

/*
 * Register all route handlers for User resource
*/
const userService = new UserService(userRepo);

export function registerUserRoutes(app) {
    app.post('/auth', auth);
    app.post('/register', registerUser);
    app.get('/v1/users', listUsers);
}

/*
 * Authtentication user handler
*/
async function auth(request, reply) {
    return await userService.auth(request.body);
}

async function registerUser(request, reply) {
    return await userService.register(request.body);
}

async function listUsers(request, reply) {
    return await userService.getAll();
}
