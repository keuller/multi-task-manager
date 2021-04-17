import { v4 } from 'uuid';
import { encode } from '../common/base64.js';

export default class UserService {

    constructor(repo) {
        this.repo = repo;
    }

    register(user) {
        const check = (err) => {
            if (err.code !== 'NOT_FOUND') {
                return { status: 'FAIL', message: err.message };
            }
            let id = v4();
            return this.repo.create(Object.assign({ id }, user))
                .then(({ status }) => ({ status, message: 'User was registered.' }));
        };

        return this.repo.findByEmail(user.email)
            .then(_usr => { throw new Error('There is an user with this email.') })
            .catch(check);
    }

    auth(credentials) {
        return this.repo.findByEmail(credentials.email)
            .then(user => {
                let token = encode({ name: user.name, id: user.id, email: user.email });
                if (user.password === credentials.password) {
                    return { status: 'OK', token };
                }
                throw new Error('');
            })
            .catch(err => ({ status: 'INVALID', message: 'Invalid credentials.' }));
    }

    getAll() {
        return this.repo.findAll();
    }

}
