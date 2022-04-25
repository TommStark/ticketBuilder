import axios from './AxiosInstance';

// eslint-disable-next-line no-undef
const { backend } = require('./URLService');

export const postTicketData = (params) => axios
    .post(backend.postTicketData(), params.body)
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getUser = (params) => axios
    .get(backend.getUserById(params))
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const authentication = (params) => axios
    .post(backend.authentication(), params.body)
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const pushTicketToAuthor = (params) => axios
    .put(backend.pushTicketToAuthor(params))
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const pushTicketToProject = (params) => axios
    .put(backend.pushTicketToProject(params.ticket), params.body)
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const isLogin = (params) => axios
    .put(backend.isLogin(),params.body)
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getProjects = () => axios
    .get(backend.getProjects())
    .then((response) => response)
    .catch((err) => { throw new Error(err); });
