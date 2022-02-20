import TokenService from '../services/token-service';
import api from './api-config';

class AuthService {
    login(user) {
        return api.post('/v1/login', {
            username: user.username,
            password: user.password
        }).then(response => {
            if (response.data.accessToken) {
                console.log(response.data)
                TokenService.setUser(response.data);
            }
            return response.data;
        });
    }

    logout() {
        TokenService.removeUser();
    }

    register(user) {
        return api.post('/v1/register', {
            username: user.username,
            email: user.email,
            password: user.password
        });
    }
}

export default new AuthService();
