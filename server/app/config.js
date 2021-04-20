import { decode } from '../common/base64.js';
import Static from 'fastify-static';
import Cors from 'fastify-cors';

export function configApp(app, publicPath) {
    // this hook checks auth token for non public endpoints
    app.addHook('preHandler', checkTokenHook);
    app.setErrorHandler(errorHandler);

    app.get('/health/liveness', liveness);
    
    app.register(Cors, { 
        origin: '*', 
        allowedHeaders: ['Content-Type', 'authorization', 'Content-Length']
    });

    app.register(Static, {
        root: publicPath,
        prefix: '/',
        prefixAvoidTrailingSlash: true,
    });
    
    return app;
}

async function liveness(request, reply) {
    return { status: 'UP' }
}

// checkTokenHook is responsible for verify is endpoint is public or not
function checkTokenHook(request, reply, done) {
    const uri = request.routerPath || '';
    const isProtected = uri.startsWith('/v1');
    
    if (!isProtected) return done();

    const hasToken = request.headers['authorization'];
    if (!hasToken) {
        return reply.status(403).send({ status: 'FORBIDDEN', message: 'No security token.' });
    }

    try {
        request.context['token'] = decode(request.headers['authorization']);
        done();
    } catch (err) {
        reply.status(400).send({ status: 'FAIL', message: 'Invalid request token.' });
    }
}

// custom error handler
function errorHandler(error, _request, reply) {
    if (!error.status) {
        reply.status(500).send(error);
    }

    switch(error.status) {
        case 'NOT_FOUND':
            return reply.status(404).send(error);
        case 'FAIL':
            return reply.status(400).send(error);
        case 'FORBIDDEN':
            return reply.status(403).send(error);
        default:
            return reply.status(500).send(error.message);
    }
}
