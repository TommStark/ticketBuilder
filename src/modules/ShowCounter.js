/* eslint-disable react/prop-types */
import React from 'react';

const DateTimeDisplay = ({ value, type, isDanger }) => {
    return (
        <div className={isDanger ? 'countdown danger' : 'countdown'}>
            <p>{value}</p>
            <span>{type}</span>
        </div>
    );
};

export const ShowCounter = ({ days, hours, minutes, seconds }) => {
    return (
        <div className="show-counter" style={{display: 'flex', justifyContent: 'center', marginTop: '20px'}}>
            <DateTimeDisplay value={days} type={'Days'} isDanger={days <= 3} />
            <p>:</p>
            <DateTimeDisplay value={hours} type={'Hours'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={minutes} type={'Mins'} isDanger={false} />
            <p>:</p>
            <DateTimeDisplay value={seconds} type={'Seconds'} isDanger={false} />
        </div>
    );
};
