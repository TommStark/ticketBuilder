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
            <div className='navbar-sign'>
                <p><div>v{appVersion}</div></p> 
            </div>
            <div className="navbar-links">
                <div className='navbar-links_container'>
                    <p><Link to="ticketBuilder/factory">Builder</Link></p>
                    <p><Link to="ticketBuilder/tickets">Tickets</Link></p>
                    <p><Link to="ticketBuilder/stats">Stats</Link></p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                    <p>&nbsp;</p>
                </div>
                <div className='navbar-sign'>
                    <div className='navbar-menu_container'>
                        <button>
                            <Link 
                                to="/ticketBuilder"
                                onClick={() => logOut()}
                            >Log Out</Link>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
Nav.propTypes = {
    logOut: PropTypes.func.isRequired,
};