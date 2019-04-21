import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {getSingleMedia, getUserId, getFilters, getDescription} from "../utils/MediaAPI";

class Single extends Component {
    mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
    state = {
        file: {
            filename: 'b2db3cce51674aba84d9476a545c5cc4.jpg',
            title: 'Test',
        },
      user:'',
      filters:'',
    };

    componentDidMount() {
        const {id} = this.props.location.state;
        console.log(id)
        getSingleMedia(id).then(pics =>{
            this.setState({file:pics,
                            filters:getFilters(pics.description),
                            description: getDescription(pics.description),
            })
            console.log(this.state.file)
        }).then(() =>{
      const userId = this.state.file.user_id;
      const token = localStorage.getItem('token')
      console.log(userId, token)
      getUserId(userId,token).then(id =>{
        console.log(id)
        this.setState({user:id})
        console.log(this.state.user)
      })})

    }


    render() {

        const filtersToCss = ()=>{
            const filter = this.state.filters;
            console.log(filter)
            const keys = Object.keys(filter);
            console.log(keys)
          let lause= '';
            let tag= '';
          for(let i =0; i<keys.length; i++ ){
              if(keys[i]=== 'blur'){
                  tag = 'px'
              }else{
                  tag= '%'
              }
              lause +=''+''+keys[i]+''+'('+ filter[keys[i]] + tag+ ') '
          }
          console.log(lause)
            return lause
        }

      const style  = {
        maxWidth: '40%',
        filter: filtersToCss(),
      };
      console.log(style)
        return (
            <React.Fragment>
                <h1>{this.state.file.title}</h1>
                {(this.state.file.media_type=== 'image'
                    &&
                    <img style={style} src={this.mediaUrl + this.state.file.filename} alt={"kuva"}/>)
                ||
                (this.state.file.media_type === 'video'
                    &&
                    <video style={style} controls>
                      <source src={this.mediaUrl + this.state.file.filename} type={this.state.file.mime_type} />
                    </video>)
                ||
                (this.state.file.media_type === 'audio'
                    &&
                    <div>
                        <img src={"http://placekitten.com/400/400"} style={style} alt={this.state.file.title}/>
                    <audio controls>
                        <source src={this.mediaUrl + this.state.file.filename} type={this.state.file.mime_type} />
                    </audio>
                    </div>
                )
                ||
                <img src={"http://placekitten.com/400/400"} alt={this.state.file.title}/>
                }
              {(!this.state.description
              &&
                  <h2>Kitten</h2>)
              ||
              <h2>Description: {this.state.description}</h2>
              }
              {(!this.state.user
                  &&
                  <h2>No user</h2>)
              ||
              <h2>Username: {this.state.user.username}</h2>
              }

            </React.Fragment>
        );
    }
}

Single.propTypes = {
    match: PropTypes.object,
};

export default Single;