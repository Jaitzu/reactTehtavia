import React from 'react';
import PropTypes from 'prop-types';

import {Redirect} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
const styles = {
    media: {
        height: '30%',

    },
};


const Profile = (props) => {
    if (props.user === null) {
        return <Redirect to="/"/>;
    }
    const {username, email, full_name} = props.user.info;
    const { classes } = props;
    return (
        <React.Fragment>

            <h1>Profile</h1>
            <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + props.user.profPic.filename} className={classes.media}   alt='Ei ole'/>

            <h2>{username}</h2>
            <p>{email}</p>
            <p>{full_name}</p>

        </React.Fragment>
    );
};
Profile.propTypes = {
    user: PropTypes.object,
    classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(Profile);