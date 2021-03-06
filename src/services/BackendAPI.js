import axios,{ getAuthorizationHeader } from './AxiosInstance';
// eslint-disable-next-line no-undef
const { backend } = require('./URLService');

export const postTicketData = (params) => axios
    .post(backend.postTicketData(), params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getUser = (params) => axios
    .get(backend.getUserById(params),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const authentication = (params) => axios
    .post(backend.authentication(), params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const pushTicketToAuthor = (params) => axios
    .put(backend.pushTicketToAuthor(params.ticketId),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const pushTicketToProject = (params) => axios
    .put(backend.pushTicketToProject(params.ticket), params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const isLogin = () => axios
    .get(backend.isLogin(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getProjects = () => axios
    .get(backend.getProjects(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const sendToDiscordChannel = (params) => axios
    .put(backend.sendToDiscordChannel(),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getProjectByUsers = () => axios
    .get(backend.getProjectByUsers(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getTicketsByAuthor = () => axios
    .get(backend.getTicketsByAuthor(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const getAllProjects = () => axios
    .get(backend.getAllProjects(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const updateProjectStatus = (params) => axios
    .post(backend.updateProjectStatus(),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const sendProjectStatus = (params) => axios
    .post(backend.sendProjectStatus(),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const scanChannel = () => axios
    .post(backend.scanChannel(),{},{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });
    
export const getOtherAuthors = () => axios
    .get(backend.getOtherAuthors(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });   

export const modifyUserInfo = (params) => axios
    .put(backend.modifyUserInfo(),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });   

export const getUserData = () => axios
    .get(backend.getUserData(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 
 
export const removeTicket = (params) => axios
    .delete(backend.removeTicket(params.ticket),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const removeTicketFromProject = (params) => axios
    .put(backend.removeTicketFromProject(params.ticket),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const removeTicketFromAuthor = (params) => axios
    .put(backend.removeTicketFromAuthor(params.ticket),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 
    
export const getTeamTickets = () => axios
    .get(backend.getTeamTickets(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const getNews = () => axios
    .get(backend.getNews(),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const changeUserAppVersion = (params) => axios
    .put(backend.changeUserAppVersion(),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const changePendingStatus = (params) => axios
    .put(backend.changePendingStatus(params.ticket),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const changeTheme = (params) => axios
    .put(backend.changeTheme(),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); }); 

export const createPost = (params) => axios
    .post(backend.createPost(params),params.body,{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const sendVersion = (params) => axios
    .put(backend.sendVersion(params),{},{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });

export const ticketsUserPagination = (params) => axios
    .get(backend.ticketsUserPagination(params),{ 
        headers: { Authorization: getAuthorizationHeader() }
    })
    .then((response) => response)
    .catch((err) => { throw new Error(err); });
    