import React from 'react';
import { Link } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';

const Nav = () => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="./"><Home /></Link>
                </li>
                <li>
                    <Link to="./Profile"><Person /></Link>
                </li>
              <li>
                <Link to="./Logout"><ExitToApp /></Link>
              </li>
            </ul>
        </nav>
    );
};

export default Nav;