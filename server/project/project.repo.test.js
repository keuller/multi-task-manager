import { expect, test } from "@jest/globals";
import projectRepo from './project.repo.js';

test('Create a new project', () => {
    return projectRepo.create({ id:'p123', userId: 'u123', title: 'Project Test' })
        .then(res => {
            expect(res).toStrictEqual({ status: 'OK' })
        })
        .catch(err => expect(err).toBeFalsy())
});

test('update projects title', () => {
    return projectRepo.updateTitle('p123', 'New Title')
        .then(res => expect(res).toStrictEqual({ status: 'OK' }))
        .catch(err => expect(err).toBeFalsy())
});

test('Find project by ID', () => {
    return projectRepo.findById('7a012488-12ad-4bfa-87f5-84d30fd11a13')
        .then(prj => expect(prj).toStrictEqual({ id: '7a012488-12ad-4bfa-87f5-84d30fd11a13', userId: '0ce32c33-c5b3-4ed5-accb-5a0ff2b7d140', title: 'John\'s Project'  }))
        .catch(err => expect(err).toBeFalsy())
});

test('Find invalid project by ID', () => {
    return projectRepo.findById('7a012488-12ad-4bfa-87f5-84d30fd11a01')
        .then(prj => expect(prj).toBeFalsy())
        .catch(err => expect(err).toStrictEqual({ status: 'NOT_FOUND' }))
});

test('get project by User', () => {
    return projectRepo.findProjects('u123')
        .then(res => expect(res.length).toEqual(1))
        .catch(err => expect(err).toBeFalsy())
});

test('should remove project by ID with valid user', () => {
    return projectRepo.remove('u123', 'p123')
        .then(res => expect(res).toStrictEqual({ status: 'OK' }))
        .catch(err => expect(err).toBeFalsy())
});

test("shouldn 't remove project by ID with invalid user", () => {
    return projectRepo.remove('u12345', 'p123')
        .then(res => expect(res).toBeFalsy())
        .catch(err => expect(err).toStrictEqual({ status: 'NOT_FOUND' }))
});
