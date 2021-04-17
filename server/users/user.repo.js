
let users = [
    { id: '0ce32c33-c5b3-4ed5-accb-5a0ff2b7d140', name: 'John Doe', email: 'johndoe@gmail.com', password: '12345' },
    { id: 'ec90be8a-2702-4bb6-9cfb-b9d538862dfb', name: 'Alice Smith', email: 'alice.smith@aol.com', password: '12345' }
];

export default {
    
    findByEmail(email) {
        return new Promise((resolve, reject) => {
            const result = users.filter(user => user.email == email);
            if (result.length == 0) {
                reject({ code: 'NOT_FOUND', message: 'User not found.' });
            }
            resolve(result[0]);
        })
    },

    create(user) {
        users = [...users, user];
        return Promise.resolve({ status: 'OK' });
    },

    findAll() {
        return Promise.resolve([...users]);
    }
}
