import { v4 } from 'uuid';
import { ok } from '../common/message.js';

export default class ProjectService {

    constructor(repo) {
        this.repo = repo;
    }

    addProject(userId, title) {
        const id = v4();
        return this.repo.create({ id, userId, title })
            .then(_res => ok('Project was created.', { projectId: id }));
    }

    updateTitle(id, title) {
        return this.repo.updateTitle(id, title)
            .then(_res => ok('Project was updated.'));
    }

    getProject(id) {
        return this.repo.findById(id);
    }

    getProjectsByUser(userId) {
        return this.repo.findProjects(userId).then(list => {
            return list.map(project => ({
                id: project.id,
                title: project.title
            }))
        });
    }

    remove(id) {
        return this.repo.remove(id)
            .then(res => ok('Project was removed.'));
    }
}
