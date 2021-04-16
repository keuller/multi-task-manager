import { fastify } from 'fastify';
import { liveness } from './app/health.handler.js';
import { registerUserRoutes } from './users/user.handler.js';
import { registerProjectRoutes } from './project/project.handler.js';
import { registerTaskRoutes } from './task/task.handler.js';

const app = fastify({ logger: false })
app.get('/', async (request, reply) => {
    return { message: 'Hello guys!' }
});

app.get('/health/liveness', liveness);
registerUserRoutes(app);
registerTaskRoutes(app);
registerProjectRoutes(app);

app.listen(3000, '0.0.0.0')
    .then(res => console.log(`Application up and running ar ${res}`))
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
