import axios from 'axios';
import { User } from 'types';

export enum LOGIN_STATE {
    CHECKING_STATUS,
    LOGGED_OUT,
    LOGGED_IN,
}

const token = localStorage.getItem('token');

if (token) {
    axios.defaults.headers.authorization = token;
}

export const login = async (username: string, password: string): Promise<User> => {
    try {
        const response = await axios.post<User>('/api/login', { username, password });
        axios.defaults.headers.authorization = response.headers.authorization;
        localStorage.setItem('token', response.headers.authorization);
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject();
    }
};

export const checkLogin = async (): Promise<User> => {
    try {
        const response = await axios.get<User>('/api/loggedin');
        return Promise.resolve(response.data);
    } catch (err) {
        return Promise.reject();
    }
};

export const logout = () => {
    axios.defaults.headers.authorization = '';
    localStorage.removeItem('token');
};
