
//format day from mongoDB to YYYY/MM/DD HH:MM:SS
export const formatDate = (date='') =>{
    return new Date(date).toJSON().slice(0,10);
};

//get last 7 days of the week
export const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
});

//get the last 7 days of tickets and their ammount
export const getLast7ticketsAmmount = (X,dataLabels,dataValue) => {
    if(!X){
        return;
    }
    const day2 = dates.map(d => d.toJSON().slice(0,10));

    const from = day2[0];
    const to = day2[6];

    const occurrences = X?.reduce( (acc, curr) => {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc;
    }, {});

    const finalValue =  Object.entries(occurrences).map( day => {
        if (day[0] <= from && day[0] >= to){
            return day;
        }
    } );

    const days = dates.map(d => d.toJSON().slice(0,10));

    days.reverse().forEach( entry => {
        const value = finalValue.filter( item => item?.includes(entry));
        dataLabels.push(entry);
        dataValue.push(value.length ? value[0][1] : 0 );
    });
};

//createPlain Ticket
export const createPlainTicket = (ticket, project, appVersion) => {
    const {checks, details, prLink, ticketLink, _id} = ticket;

    return ({
        prLink       : prLink,
        ticketLink   : ticketLink,
        project      : project.name,
        projectColor : project.color,
        details,
        checks,
        version      : appVersion,
        id           : _id,

    });
};

export const createPlainTicketWithAuthor = (ticket, project, appVersion, authorAdmin) => {
    const {checks, details, prLink, ticketLink, _id} = ticket;

    return ({
        prLink       : prLink,
        ticketLink   : ticketLink,
        project      : project.name,
        projectColor : project.color,
        details,
        checks,
        version      : appVersion,
        id           : _id,
        userId       : authorAdmin._id,
        user         : authorAdmin
    });
};

export const hasInvalidChars = (obj) => {
    const isAlphanumeric = (txt) => {
        const letters = /^[a-zA-Z0-9 !@#$%^&*/)(+=._-]+$/;
        if (letters.test(txt)) {
            return true;
        }
        return false;
    };
    const keyNotExcluded = (fieldKey) => ['img'].indexOf(fieldKey) === -1;
    const values = Object.values(obj);
    const keys = Object.keys(obj);

    const invalidFieldsKeys = values.map((value, i) => (!isAlphanumeric(value) && keyNotExcluded(keys[i]) ? keys[i] : false));
    return invalidFieldsKeys.filter(field => !!field);
};