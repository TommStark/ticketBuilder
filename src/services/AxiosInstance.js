import axios from 'axios';
import Cookies from 'js-cookie';

const token =  Cookies.get('token');
let headers = {};

if(token){
    headers.Authorization = token;
}

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
    headers,
});

// instance.defaults.headers.common['Authorization'] = Cookies.get('token');

export default instance;
