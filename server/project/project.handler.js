/*
 * Register all route handlers for User resource
*/
export function registerProjectRoutes(app) {
    app.post('/v1/projects', create);
    app.put('/v1/projects/:id', update);
    app.get('/v1/projects/:id', getById);
    app.delete('/v1/projects/:id', remove);
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

