import api from './api-config';

class UserService {

    getPublicContent() {
        return api.get('/v1/users');
    }

    getUserMessage() {
        return api.get('/user');
    }

    getAdminMessage() {
        return api.get('/admin');
    }

    deleteUser(id) {
        return api.delete('/v1/user?id=' + id);
    }

    getUserById(id) {
        return api.get('/v1/user/findById?id=' + id);
    }

    updateUser(user) {
        const data = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }
        return api.put('/v1/user', data);
    }

    changePassword(changePass) {
        const data = {
            oldPassword: changePass.oldPassword,
            password: changePass.password,
            confirmPassword: changePass.confirmPassword
        }
        return api.put('/v1/user/changePassword', data);
    }
}

export default new UserService();
