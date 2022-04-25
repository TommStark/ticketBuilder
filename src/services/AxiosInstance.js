import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'https://arz-ticket-builder.herokuapp.com/api',
});

instance.defaults.headers.common.Authorization = Cookies.get('token') || '';

export default instance;
