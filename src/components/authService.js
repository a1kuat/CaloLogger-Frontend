import axios from 'axios';

const API_URL = 'http://localhost:8080/api/auth/';

class AuthService {
 login(user) {
    return axios
      .post(API_URL + 'signin', {
        login: user.login,
        password: user.password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
 }

 register(user) {
    return axios.post(API_URL + 'signup', {
      login: user.login,
      password: user.password,
    });
 }
}

export default new AuthService();
