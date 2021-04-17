import { fastify } from 'fastify';
import { configApp } from './app/config.js';
import { registerUserRoutes } from './users/user.handler.js';
import { registerProjectRoutes } from './project/project.handler.js';
import { registerTaskRoutes } from './task/task.handler.js';

const app = configApp(fastify({ logger: false }));
registerUserRoutes(app);
registerTaskRoutes(app);
registerProjectRoutes(app);

app.listen(3000, '0.0.0.0')
    .then(res => console.log(`Application up and running ar ${res}`))
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
