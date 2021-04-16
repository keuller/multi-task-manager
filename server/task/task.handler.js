/*
 * Register all route handlers for User resource
*/
export function registerTaskRoutes(app) {
    app.post('/v1/tasks', create);
    app.put('/v1/tasks/:id', update);
    app.get('/v1/tasks/:id', getById);
    app.delete('/v1/tasks/:id', remove);
}

function create(request, reply) {
    throw new Error('Not implemented yet');
}

function update(request, reply) {
    throw new Error('Not implemented yet');
}

function getById(request, reply) {
    throw new Error('Not implemented yet');
}

function remove(request, reply) {
    throw new Error('Not implemented yet');
}
