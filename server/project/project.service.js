import { v4 } from 'uuid';

export default class ProjectService {

    constructor(repo) {
        this.repo = repo;
    }

    addProject(userId, title) {
        const id = v4();
        const project = { id, userId, title };
        return this.repo.create(project)
            .then(res => ({ status: 'OK', message: 'Project was created.' }));
    }

    updateTitle(id, title) {
        return this.repo.updateTitle(id, title)
            .then(res => ({ status: 'OK', message: 'Project was updated.' }));
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
            .then(res => ({ status: 'OK', message: 'Project was removed.' }));
    }
}
