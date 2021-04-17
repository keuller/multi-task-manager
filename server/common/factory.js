import userRepo from '../users/user.repo.js';
import UserService from '../users/user.service.js';
import projectRepo from '../project/project.repo.js';
import ProjectService from '../project/project.service.js';
import taskRepo from '../task/task.repo.js';
import TaskService from '../task/task.service.js';

export function getUserService() {
    return new UserService(userRepo);
}

export function getProjectService() {
    return new ProjectService(projectRepo);
}

export function getTaskService() {
    return new TaskService(taskRepo);
}
