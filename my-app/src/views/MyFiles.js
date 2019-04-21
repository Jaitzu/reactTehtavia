import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import {getDescription, getUserMedia, deleteImg} from "../utils/MediaAPI";
import Paper from "@material-ui/core/Paper";
import {Link} from "react-router-dom";
import FullScreen from '@material-ui/icons/Fullscreen';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit'
import { withStyles } from '@material-ui/core/styles';

const style = {
    maxHeight: "90%",
    maxWidth: "90%",
    minHeight: "90%",
    minWidth: "90%",
    margin: "1em",
    textAlign: 'center',
    display: 'inline-block',
};

class MyFiles extends Component {

        state = {
            item:[ ],
        }

        getMedia=()=>{
          const token = localStorage.getItem('token');
          getUserMedia(token).then(response =>{
            this.setState({
              item:response,
            })
          })
        }

    componentDidMount() {
 this.getMedia();
    }
handleDelete=(id)=>{

  deleteImg(id);
  this.getMedia();
}
    render() {
    console.log(this.state)
        return (
            <Grid container spacing={0}>
                {this.state.item.map((items, i) => (
                    <Grid item xs={4} key={i}>
                        <Paper style={style}>
                            <h1>{items.title}</h1>
                            {(items.thumbnails !== undefined
                                &&
                                <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + items.thumbnails.w160}
                                     alt={"kuva"}/>)
                            ||
                            (items.screenshot !== undefined
                                &&
                                <img src={'http://media.mw.metropolia.fi/wbma/uploads/' + items.screenshot}
                                     alt={"kuva"}/>)
                            ||
                            <img src={"http://placekitten.com/400/400"} alt={items.title}/>
                            }
                            <p>{getDescription(items.description)}</p>
                            <ul>
                                <li>
                            <Link to={{
                                pathname: "/Single",
                                state: {
                                    id: items.file_id
                                }

                            }}><FullScreen/></Link>
                                </li>
                                <li>
                                    <Delete
                                        onClick={() => {this.handleDelete(items.file_id)}}
                                    />


                                </li>
                              <li>
                                <Link to={{
                                  pathname: "/Modify",
                                  state: {
                                    id: items.file_id
                                  },


                                }}><Edit/></Link>
                              </li>
                            </ul>
                        </Paper>
                    </Grid>

                ))}
            </Grid>
                )
    };
};


export default withStyles (style) (MyFiles);





