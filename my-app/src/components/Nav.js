import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import Save from '@material-ui/icons/Save';
const Nav = (props) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home"><Home /></Link>
                </li>
              {!props.checkLogin() &&
              <li>
                <Link to="/"><ExitToApp /></Link>
              </li>
              }
                {props.checkLogin() &&
                    <React.Fragment>
                <li>
                    <Link to="./Profile"><Person /></Link>
                </li>
                      <li>
                        <Link to="./Uploads"><Save /></Link>
                      </li>
              <li>
                <Link to="./Logout"><ExitToApp /></Link>
              </li>
                    </React.Fragment>
                    }
            </ul>
        </nav>
    );
};
Nav.propTypes ={
  checkLogin: PropTypes.func,
};
export default Nav;