const getUserById = (userId) => (`/author/${userId}`);

const postTicketData = () => ('/ticket');

const authentication = () => ('/auth');

const pushTicketToAuthor = (ticketId) => (`/author/${ticketId}`);

const getOtherAuthors = () => ('/author/others');

const pushTicketToProject = (ticketId) => (`/project/${ticketId}`);

const isLogin = () => ('/auth/login');

const getProjects = () => ('/project');

const sendToDiscordChannel = () => ('/discBot');

const getProjectByUsers = () => ('/project/by/author');

const getTicketsByAuthor = () =>('/ticket/by/author');

const getAllProjects = () =>('/project/all');

const updateProjectStatus = () =>('/project/update/status');

const sendProjectStatus = () =>('/discBot/push/project');

const scanChannel = () =>('/discBot/scan/channel');

const modifyUserInfo = () =>('/author/updateInfo');

const getUserData = () =>('/author/myUser');

const removeTicket = (ticketId) =>(`/ticket/${ticketId}`);

const removeTicketFromProject = (ticketId) =>(`/project/delete/${ticketId}`);

const removeTicketFromAuthor = (ticketId) =>(`/author/delete/${ticketId}`);

const getTeamTickets = () => ('/ticket');

const getNews  = () => ('/news');

const changeUserAppVersion = () => ('/author/appVersion');

const changePendingStatus = (ticketId) =>(`/ticket/pending/${ticketId}`);

const changeTheme = () => ('/author/theme');


export const backend = {
    getUserById,
    postTicketData,
    authentication,
    pushTicketToAuthor,
    isLogin,
    getProjects,
    pushTicketToProject,
    sendToDiscordChannel,
    getProjectByUsers,
    getTicketsByAuthor,
    getAllProjects,
    updateProjectStatus,
    sendProjectStatus,
    scanChannel,
    getOtherAuthors,
    modifyUserInfo,
    getUserData,
    removeTicket,
    removeTicketFromProject,
    removeTicketFromAuthor,
    getTeamTickets,
    getNews,
    changeUserAppVersion,
    changePendingStatus,
    changeTheme
};
