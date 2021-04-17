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

test('get project by User', () => {
    return projectRepo.findProjects('u123')
        .then(res => expect(res.length).toEqual(1))
        .catch(err => expect(err).toBeFalsy())
});

test('remove project by ID', () => {
    return projectRepo.remove('p123')
        .then(res => expect(res).toStrictEqual({ status: 'OK' }))
        .catch(err => expect(err).toBeFalsy())
});

