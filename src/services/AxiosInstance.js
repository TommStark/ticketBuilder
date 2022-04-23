import axios from 'axios';
import Cookies from 'js-cookie';

const instance = axios.create({
    baseURL: 'http://localhost:8080/api',
});

instance.defaults.headers.common.Authorization = Cookies.get('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjYzMzBkNTBlZTFkNWFiZTkzYjlkMmUiLCJuYW1lIjoiZGF0YSIsImVtYWlsIjoiZGF0YUBnbWFpbC5jb20iLCJpYXQiOjE2NTA2NjkzMjMsImV4cCI6MTY1MDc1NTcyM30.OmHRy4HQ3vXwt0ARKPxBjxUyHvmTZFeORZt-Vrb7mD0';

export default instance;
