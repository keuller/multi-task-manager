import { expect, test } from "@jest/globals";
import taskRepo from './task.repo.js';

test('Add a new task', () => {
    const t1 = { id: 't123', projectId: 'p123', title: 'Task 1', createdAt: new Date(), finishedAt: null }
    return taskRepo.create(t1)
        .then(res => expect(res).toStrictEqual({ status: 'OK' }))
        .catch(err => expect(err).toBeFalsy())
});

test('Fetch all tasks by project', () => {
    return taskRepo.findtasks('p123')
        .then(res => expect(res.length).toEqual(1))
        .catch(err => expect(err).toBeFalsy())
});

test('Finish a task', () => {
    return taskRepo.finish('p123', 't123')
        .then(res => expect(res).toStrictEqual({ status: 'OK' }))
        .catch(err => expect(err).toBeFalsy())
});

test('Check task is finished', () => {
    return taskRepo.isFinished('p123', 't123')
        .then(res => expect(res).toEqual(true))
        .catch(err => expect(err).toBeFalsy())
});

test('Try to finish an invalid task', () => {
    return taskRepo.finish('p123', 't000')
        .then(res => expect(res).toBeFalsy())
        .catch(err => expect(err).toStrictEqual({ status: 'NOT_FOUND' }))
});

test('Remove a task by ID', () => {
    return taskRepo.remove('p123', 't123')
        .then(res => expect(res).toStrictEqual({ status: 'OK' }))
        .catch(err => expect(err).toBeFalsy())
});

test('Try to remove an invalid task', () => {
    return taskRepo.finish('p123', 't000')
        .then(res => expect(res).toBeFalsy())
        .catch(err => expect(err).toStrictEqual({ status: 'NOT_FOUND' }))
});
