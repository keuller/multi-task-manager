import { v4 } from 'uuid';
import { encode } from '../common/base64.js';

export default class UserService {

    constructor(repo) {
        this.repo = repo;
    }

    async register(user) {
        try {
            await this.repo.findByEmail(user.email);
            return Promise.reject({ status: 'FAIL', message: 'There is an user with this email.' });
        } catch(err) {
            if (err.code === 'NOT_FOUND') {
                user.id = v4();
                this.repo.create(user);
                return Promise.resolve({ message: 'User registared.' });
            }
            return Promise.reject({ status: 'FAIL', message: err });
        }
    }

    async auth(credentials) {
        try {
            let model = await this.repo.findByEmail(credentials.email);
            let token = encode({ name: model.name, id: model.id, email: model.email });

            if (model.password === credentials.password) {
                return Promise.resolve({ status: 'OK', token });
            }
            return Promise.reject({ status: 'INVALID', message: 'Invalid data.' });
        } catch(err) {
            console.log(err);
            return Promise.reject({ status: 'INVALID', message: 'Invalid credentials.' });
        }
    }

    getAll() {
        return this.repo.findAll();
    }

}
