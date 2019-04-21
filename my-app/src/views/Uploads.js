import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';
import classNames from 'classnames';
import {withStyles, Typography} from "@material-ui/core";
import Slider from '@material-ui/lab/Slider';
import Grid from '@material-ui/core/Grid';


const styles = theme => ({
  holder: {
    display: 'flex',
    justifyContent: 'center',
  },
  wrapper: {
    margin: theme.spacing.unit,
    position: 'relative',
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -6,
    left: -6,
    zIndex: 1,
  },
    media: {
      maxWidth: '40%',
      minWidth: '40%'

    },
  slider: {
    padding: '22px 0px',
  },

});

const style = {
  maxHeight: "90%",
  maxWidth: "90%",
  minHeight: "90%",
  minWidth: "90%",
  margin: "1em",
  textAlign: 'center',
  display: 'inline-block',
};

class Upload extends Component {
  apiUrl = 'http://media.mw.metropolia.fi/wbma/';

  state = {
    file: {
      title: '',
      desc: '',
      data: null,
      filename: undefined,
    },
    filter: {
      brightness: 100,
      contrast: 100,
      saturate: 100,
      blur: 0,
    },

    imgSrc:'',
    loading:false,
    success: false
  };

  handleInputChange = (evt) => {
    const target = evt.target;
    console.log(target)
    const value = target.value;
    const name = target.name;

    console.log(value, name);

    this.setState((prevState) => ({
        file: {
          ...prevState.file,
          [name]: value,

      },
    }));
  };

  handleSliderChange = name => (evt, value) => {
    console.log(this.state.picValues)
    const target = evt.target;
    console.log(target)
    console.log(value)
    console.log(name)
    this.setState((prevState) => ({
      filter: {
        ...prevState.filter,
        [name]: value,

      },
    }));
  };

  handleFileChange = (evt) => {
    evt.persist();
    const pic= evt.target.files[0];
    console.log(pic);

    this.setState((prevState) => ({
      file: {
        ...prevState.file,
        data: pic,

      },
    }));
    const reader = new FileReader();
    if(pic.type !== 'image/jpeg'){
      this.setState({
        imgSrc: 'https://www.freeiconspng.com/uploads/no-image-icon-4.png',
      })
    }else {
     reader.readAsDataURL(pic);
      reader.onloadend = () => {
        this.setState({
          imgSrc: reader.result,
        })
    }

    }

  };

  handleFileSubmit = (evt) => {
    console.log(evt);
    const fd = new FormData();
    fd.append('title', this.state.file.title);
      const description  = `[d]${this.state.file.description}[/d][f]${JSON.stringify(this.state.filter)}[/f]`
      fd.append('description', description);
    fd.append('file', this.state.file.data);
    console.log(fd)
    const options = {
      method: 'POST',
      body: fd,

      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    };
    console.log(fd +' mmmmmmmmmmmmmmmmmmmmmmmkkkkkkkkkkkkkkkkkkkkk')
    console.log(options)
     fetch(this.apiUrl+'media',options).then(response => {
      console.log(response);
    }).then(json => {
      console.log(json);
      setTimeout( () =>{
      this.props.history.push("/home");
      this.props.getMedia();
      },2500);
    })
    if (!this.state.loading) {
      this.setState(
          {
            loading: true,
            success: false,

          },
          () => {
            this.timer = setTimeout(() => {
              this.setState({
                loading: false,
                success: true,
              });
            }, 2000);
          },
      );
    }
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
  }


  render() {
    const {loading,success } = this.state;
    const { classes } = this.props;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });
    const pic = {
      filter:
        'brightness(' + this.state.filter.brightness + '%) contrast(' + this.state.filter.contrast + '%) saturate(' + this.state.filter.saturate +'%) blur(' + this.state.filter.blur +'px)',
      maxWidth:'500px'
    };
console.log(pic)

    return (
        <React.Fragment>
          <h1>Upload</h1>
          <Grid container
                direction="column"
                justify="center"
                alignItems="center" spacing={40}

          >
            <Grid item xs={12} >
          <img className={classes.media} style={pic} src={this.state.imgSrc} alt={'img preview'}></img>
            </Grid>
              <Grid item xs={12} style={style} >
            <Grid container spacing={40}
                  direction="column"
                  justify="center"
                  alignItems="center">
              <Grid item xs={12}
                    style={style}>
                <Typography id="contrast-label">Brightness: {this.state.filter.brightness}%</Typography>
            <Slider
                classes={{ container: classes.slider }}
                value={this.state.filter.brightness}
                aria-labelledby="Brightness"
                min={0}
                max={200}
                onChange={this.handleSliderChange("brightness")}
            />
              </Grid>
              <Grid item xs={12}
                    style={style}>
                <Typography id="contrast-label">Contrast: {this.state.filter.contrast}%</Typography>
            <Slider
                classes={{ container: classes.slider }}
                value={this.state.filter.contrast}
                aria-labelledby="Contrast"
                min={0}
                max={200}
                onChange={this.handleSliderChange("contrast")}
            />
              </Grid>
              <Grid item xs={12}
                    style={style}>
                <Typography id="contrast-label">Saturation: {this.state.filter.saturate}%</Typography>
            <Slider
                classes={{ container: classes.slider }}
                value={this.state.filter.saturate}
                aria-labelledby="Saturation"
                min={0}
                max={200}
                onChange={this.handleSliderChange("saturate")}
            />
              </Grid>
              <Grid item xs={12}
                    style={style}>
                <Typography id="contrast-label">Blur: {this.state.filter.blur}px</Typography>
            <Slider
                classes={{ container: classes.slider }}
                value={this.state.filter.blur}
                aria-labelledby="Blur"
                min={0}
                max={5}
                onChange={this.handleSliderChange("blur")}
            />
              </Grid>
            </Grid>
            </Grid>
          </Grid>
          <ValidatorForm  instantValidate={false}
                         onSubmit={this.handleFileSubmit}
                         onError={errors => console.log(errors)}>
            <TextValidator name="title" label="Title"
                           value={this.state.file.title}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth/>
            <TextValidator name="description" label="Description"
                           value={this.state.file.description}
                           onChange={this.handleInputChange}
                           validators={['required', 'minStringLength:3']}
                           errorMessages={[
                             'this field is required',
                             'minimum 3 charaters']}
                           fullWidth
                           multiline
                           rows={3}/>
            <TextValidator name="filedata" label="File"
                           value={this.state.file.filename}
                           type="file"
                           onChange={this.handleFileChange}
                           fullWidth/>
            <div className={classes.holder}>
            <div className={classes.wrapper}>
            <Fab type="submit" color="primary"  className={buttonClassname} >
              {success ? <CheckIcon /> : <SaveIcon />}
            </Fab>
              {loading &&<CircularProgress size={68} className={classes.fabProgress} />}
            </div>
            </div>
          </ValidatorForm>
        </React.Fragment>
    )
        ;
  }
}

Upload.propTypes = {
  history: PropTypes.object,
  getMedia: PropTypes.func,
  classes: PropTypes.object.isRequired
};

export default withStyles(styles) (Upload);

