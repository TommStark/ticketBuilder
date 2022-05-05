const getUserById = (userId) => (`/author/${userId}`);

const postTicketData = () => ('/ticket');

const authentication = () => ('/auth');

const pushTicketToAuthor = (ticketId) => (`/author/${ticketId}`);

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
    scanChannel
};
