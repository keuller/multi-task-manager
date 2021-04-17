
let tasks = {};

export default {

    create(task) {
        return new Promise((resolve, reject) => {
            let subtasks = tasks[task.projectId] || [];
            tasks[task.projectId] = [...subtasks, task];
            resolve({ status: 'OK' });
        });
    },

    update(task) {
        return new Promise((resolve, reject) => {
            let subtasks = tasks[task.projectId] || [];
            let idx = subtasks.findIndex(item => item.id == task.id);
            if (idx == -1) return reject({ status: 'NOT_FOUND' });
            subtasks[idx].description = task.description;
            tasks[task.projectId] = [...subtasks];
            resolve({ status: 'OK' });
        });
    },

    finish(projectId, taskId) {
        return new Promise((resolve, reject) => {
            let subtasks = tasks[projectId] || [];
            let idx = subtasks.findIndex(item => item.id == taskId);
            if (idx == -1) return reject({ status: 'NOT_FOUND' });
            subtasks[idx].finishedAt = new Date();
            tasks[projectId] = [...subtasks];
            resolve({ status: 'OK' });
        });
    },

    isFinished(projectId, taskId) {
        return new Promise((resolve, reject) => {
            let subtasks = tasks[projectId] || [];
            let idx = subtasks.findIndex(item => item.id == taskId);
            if (idx == -1) {
                return reject({ status: 'NOT_FOUND' })
            }
            (subtasks[idx].finishedAt ? resolve(true) : resolve(false));
        });
    },

    remove(projectId, taskId) {
        return new Promise((resolve, reject) => {
            let subtasks = tasks[projectId] || [];
            let idx = subtasks.findIndex(item => item.id == taskId);
            if (idx == -1) {
                return reject({ status: 'NOT_FOUND' })
            }
            subtasks.splice(idx, 1);
            tasks[projectId] = [...subtasks];
            resolve({ status: 'OK' })
        });
    },

    findtasks(projectId) {
        return new Promise((resolve, reject) => {
            let subtasks = tasks[projectId] || [];
            resolve([...subtasks]);
        });
    }

}
