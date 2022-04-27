import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-undef
const pjson = require('../../package.json');

export default function Nav({logOut}){
    const appVersion = pjson.version;
    return(
        <div className="navbar">
            <div className="logo">v{appVersion}</div>
            <ul className="nav-links">
                <Link to="ticketBuilder/factory">Builder</Link>
                <Link to="ticketBuilder/stats">Stats</Link>
                <Link 
                    to="/ticketBuilder"
                    onClick={() => logOut()}
                >Log Out</Link>
            </ul>
        </div>
    );
}
Nav.propTypes = {
    logOut: PropTypes.func.isRequired,
};