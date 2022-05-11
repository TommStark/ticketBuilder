/* eslint-disable react/react-in-jsx-scope */
import Typography from '@mui/material/Typography';

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
    const day2 = dates.map(d => d.toJSON().slice(0,10));

    const from = day2[0];
    const to = day2[6];

    const occurrences = X.reduce( (acc, curr) => {
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

//Label when you jave not tickets

export function showZeroTicketsLabel(){
    return <Typography> You do not have tickets yet </Typography>;
}
