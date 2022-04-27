import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

instance.defaults.headers.common.Authorization = Cookies.get('token') || ' ';

export default instance;
