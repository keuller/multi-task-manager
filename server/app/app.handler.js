
export async function liveness(request, reply) {
    return { status: 'UP' }
}

export function checkTokenHook(request, reply, done) {
    const idx = ['/', '/auth', '/register'].findIndex(path => path == request.routerPath);

    if (idx > -1) {
        return done();
    }

    const hasToken = request.headers['authorization'];
    if (!hasToken) {
        throw new Error('Invalid request token.');
    }

    done();
}
