import { expect, test } from "@jest/globals";
import userRepo from './user.repo.js';

test('Find user by email', () => {
    const usr = { id: '0ce32c33-c5b3-4ed5-accb-5a0ff2b7d140', name: 'John Doe', email: 'johndoe@gmail.com', password: '12345' };

    userRepo.findByEmail('johndoe@gmail.com')
        .then(user => expect(user).toStrictEqual(usr))
        .catch(err => expect(err).toBeFalsy())
});

test('List users', () => {
    userRepo.findAll()
        .then(list => expect(list.length).toEqual(2))
        .catch(err => expect(err).toBeFalsy())
});

test('Register new user', () => {
    const usr = { id:'u123', name:'Test User', email: 'user@test.com', password: '' };
    userRepo.create(usr)
    .then(res => expect(res).toStrictEqual({ status: 'OK' }))
    .catch(err => expect(err).toBeFalsy())
});
