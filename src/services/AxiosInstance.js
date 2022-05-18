import axios from 'axios';
import Cookies from 'js-cookie';

export const getToken = () => Cookies.get('token')
    ? Cookies.get('token')
    : null;

export const getAuthorizationHeader = () => getToken();

const instance = axios.create({
    baseURL : 'https://arz-ticket-builder.herokuapp.com/api',
    // baseURL : 'http://localhost:8080/api',
    headers : { Authorization: getAuthorizationHeader() },
});

export default instance;
