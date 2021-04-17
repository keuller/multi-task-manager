import { v4 } from 'uuid';

export default class TaskService {

    constructor(repo) {
        this.repo = repo;
    }

    addTask(projectId, description) {
        const id = v4();
        const task = { id, projectId, description, createdAt: new Date(), finishedAt: null };
        return this.repo.create(task)
            .then(_res => ({ status: 'OK', taskId: id, message: 'Task was created.' }))
    }

    updateTask(projectId, task) {
        return this.repo.isFinished(projectId, task.taskId)
            .then(wasFinished => {
                if (wasFinished) {
                    return { status:'OK', message: 'This task has already been finished.' };
                }
                return this.repo.update({ id: task.taskId, projectId, description: task.description })
                    .then(_res => ({ status: 'OK', message: 'Task was updated.' }));
            });
    }

    finish(projectId, taskId) {
        return this.repo.isFinished(projectId, taskId)
            .then(wasFinished => {
                if (wasFinished) {
                    return { status:'OK', message: 'This task has already been finished.' };
                }
                return this.repo.finish(projectId, taskId)
                    .then(_res => ({ status: 'OK', message: 'Task was finished.' }));
            })
    }

    remove(projectId, taskId) {
        return this.repo.isFinished(projectId, taskId)
            .then(wasFinished => {
                if (wasFinished) {
                    return { status:'FAIL', message: 'This task cannot be removed.' };
                }
                return this.repo.remove(projectId, taskId);
            })
    }

    getTasks(projectId) {
        return this.repo.findtasks(projectId)
            .then(list => list.map(({ id, description, finishedAt }) => ({ id, description, finishedAt })));
    }

}
