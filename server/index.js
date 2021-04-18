import path from 'path';
import { fastify } from 'fastify';
import { configApp } from './app/config.js';
import { registerUserRoutes } from './users/user.handler.js';
import { registerProjectRoutes } from './project/project.handler.js';

const publicPath = path.join(__dirname, '../public');
const app = configApp(fastify({ logger: false }), publicPath);
registerUserRoutes(app);
registerProjectRoutes(app);

app.listen(3000, '0.0.0.0')
    .then(res => console.log(`Application up and running at ${res}`))
    .catch((err) => {
        console.error(err);
        process.exit(-1);
    });
