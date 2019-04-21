import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Home from '@material-ui/icons/Home';
import Save from '@material-ui/icons/Save';
import PhotoAlbum from "@material-ui/icons/PhotoAlbum";
const Nav = (props) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/home"><Home />Home</Link>
                </li>
              {!props.checkLogin() &&
              <li>
                <Link to="/"><ExitToApp />Login</Link>
              </li>
              }
                {props.checkLogin() &&
                    <React.Fragment>
                <li>
                    <Link to="./Profile"><Person />Profile</Link>
                </li>
                      <li>
                        <Link to="./Uploads"><Save />Upload</Link>
                      </li>
                        <li>
                            <Link to="./MyFiles"><PhotoAlbum />My files</Link>
                        </li>
              <li>
                <Link to="./Logout"><ExitToApp />Logout</Link>
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