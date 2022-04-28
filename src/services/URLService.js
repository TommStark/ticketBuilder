const getUserById = (userId) => (`/author/${userId}`);

const postTicketData = () => ('/ticket');

const authentication = () => ('/auth');

const pushTicketToAuthor = (ticketId) => (`/author/${ticketId}`);

const pushTicketToProject = (ticketId) => (`/project/${ticketId}`);

const isLogin = () => ('/auth/login');

const getProjects = () => ('/project');

const sendToDiscordChannel = () => ('/discBot');

export const backend = {
    getUserById,
    postTicketData,
    authentication,
    pushTicketToAuthor,
    isLogin,
    getProjects,
    pushTicketToProject,
    sendToDiscordChannel
};
