import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import FullScreen from '@material-ui/icons/Fullscreen';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const style = {
    maxHeight: "90%",
    maxWidth: "90%",
    minHeight: "90%",
    minWidth: "90%",
    margin: "1em",
    textAlign: 'center',
    display: 'inline-block',
};


class Div extends Component {


    render() {

        return this.props.item.map((items, i) => (

            <Grid item xs={4} key={i}>
                <Paper style={style}>
                <h1>{items.title}</h1>
                    {(items.thumbnails !== undefined
                        &&
                        <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + items.thumbnails.w160} alt={"kuva"}/>)
                    ||
                    (items.screenshot !== undefined
                        &&
                        <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + items.screenshot} alt={"kuva"}/>)
                    ||
                        <img src={"http://placekitten.com/400/400"} alt={items.title}/>
                    }
                <p>{items.description}</p>
                <Link to={{
                    pathname: "/Single",
                    state: {
                        id: items.file_id
                    }
                }}><FullScreen/></Link>
                </Paper>
            </Grid>
        ));
    }
}
Div.propTypes ={
    item: PropTypes.array
}

export default Div;

