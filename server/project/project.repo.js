
let projects = [
    { id: '7a012488-12ad-4bfa-87f5-84d30fd11a13', userId: '0ce32c33-c5b3-4ed5-accb-5a0ff2b7d140', title: 'John\'s Project'  }
];

export default {

    create(project) {
        return new Promise((resolve, _reject) => {
            projects = [...projects, project];
            resolve({ status: 'OK' })
        });
    },

    updateTitle(id, title) {
        return new Promise((resolve, reject) => {
            let idx = projects.findIndex(item => item.id == id);
            if (idx == -1) {
                return reject({ status: 'NOT_FOUND' })
            }
            projects[idx].title = title;
            resolve({ status: 'OK' });
        });
    },

    remove(userId, id) {
        return new Promise((resolve, reject) => {
            let idx = projects.findIndex(item => item.id == id && item.userId == userId);
            if (idx == -1) {
                return reject({ status: 'NOT_FOUND' })
            }
            projects.splice(idx, 1);
            projects = [...projects];
            resolve({ status: 'OK' })
        });
    },

    findById(id) {
        return new Promise((resolve, reject) => {
            let idx = projects.findIndex(item => item.id == id);
            if (idx == -1) {
                return reject({ status: 'NOT_FOUND' })
            }
            resolve(projects[idx]);
        });
    },

    findProjects(userId) {
        return new Promise((resolve, reject) => {
            resolve(projects.filter(prj => prj.userId == userId));
        });
    }

}
