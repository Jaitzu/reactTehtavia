import React from 'react';
import PropTypes from 'prop-types';
import ExitToApp from "@material-ui/core/SvgIcon/SvgIcon";
import {Link} from "react-router-dom";





const Profile = (props) => {
    console.log(props.user)
    return (
        <React.Fragment>

            <h1>Profile</h1>
          <h2>{props.user.info.username}</h2>
            <p>{props.user.info.email}</p>
            <p>{props.user.info.full_name}</p>
          <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + props.user.profPic.filename}   alt='Ei ole'/>
            <ul>
                <li>
                    <Link to="./Logout"><ExitToApp /></Link>
                </li>
            </ul>

        </React.Fragment>
    );
};
Profile.propTypes = {
    user: PropTypes.object,
};
export default Profile;