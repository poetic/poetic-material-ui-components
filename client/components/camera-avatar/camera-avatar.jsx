const {
  Avatar,
  FontIcon,
  TextField
}= mui

pmc.cameraAvatar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  getInitialState() {
    return({
      picTaken: false,
      pic: this.props.image || ''
    })
  },
  _takePicture(e) {
        let fileUploadDom = React.findDOMNode(this.refs.fileUpload);
    fileUploadDom.click();
    e.preventDefault();
  },
  _handleChange(e) {
    let imageType = /^image\//;
    let file = e.target.files['0'];
    let avatar = React.findDOMNode(this.refs.pmcCameraAvatar);
    let self = this;


    if (imageType.test(file.type)) {
      let reader = new FileReader();
      reader.onload = (function(aImg) {
        return function(e) {
          self.setState({
            pic:e.target.result,
            picTaken: true
          })
        }
      })(avatar);
      reader.readAsDataURL(file);

    }else{
      alert('invalid file recieved!')
    }
  },
  render() {
    let styles = {
      name: {
        'width' : '195px',
        'display': 'inline-block '
      },
      email: {
        'width' : '280px',
        'display': 'block'
      },
      avatar: {
        'height' : '90px',
        'display' : 'inline-block'
      }
    }
    let avatar;
    let avatar1 = <div>
      <Avatar className='pmcCameraAvatar'  ref='pmcCameraAvatar' style={{'display':'block','height':'60px','width':'60px'}}
        icon={
          <FontIcon style={{'height':'30px','width':'30px'}} className='material-icons'>photo_camera</FontIcon>
          } />
        <a href='#' onClick={this._takePicture}> upload</a>

      </div>;


      if(this.state.picTaken || this.state.pic) {
        avatar = <div><Avatar className='pmcCameraAvatar' ref='pmcCameraAvatar' style={{'display':'block','height':'60px','width':'60px'}}
            src={this.state.pic} /><a href='#' onClick={this._takePicture}>Change</a></div>
      }
      else{
        avatar = avatar1;
      }
      return (
        <div style={styles.avatar}>
          {avatar}
          <input
            ref="fileUpload"
            type="file"
            style={{"display" : "none"}}
            onChange={this._handleChange}/>

        </div>
      )
  }
})

Template.pmc_cameraAvatar.helpers({
  pmcCameraAvatar() {
    return pmc.cameraAvatar
  },
  _action() {
    return this.action;
  }
})
