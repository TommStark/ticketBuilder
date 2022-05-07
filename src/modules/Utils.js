//format day from mongoDB to YYYY/MM/DD HH:MM:SS
export const formatDate = (date) =>{
    return date.split('.')[0].split('T').join(' ');
};