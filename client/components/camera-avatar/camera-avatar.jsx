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
      console.dir('invalid file recieved!')
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
      },
      cameraAvatarText: {
        'fontSize': '16px'
      }
    }
    let avatar = [];
    let text = 'Upload'

    if(this.state.picTaken || this.state.pic) {
      text = 'Change'
    }

    avatar.push(
      <div key={'avatar-' + avatar.length}
        onClick={this._takePicture}
        >
        <Avatar className='pmcCameraAvatar'
          ref='pmcCameraAvatar'
          style={{'display':'block','height':'60px','width':'60px'}}
          src={this.state.pic} />
        <a href='#' style={styles.cameraAvatarText} >{text}</a>
      </div>
    )
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
