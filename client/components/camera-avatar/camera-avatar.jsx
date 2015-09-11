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
      pic: ''
    })
  },
  _takePicture(e) {
    let self = this;
    MeteorCamera.getPicture({width:60,height:60,quality:100},function(err,data){
      if(err) {
        console.log('cameraErr')
        console.log(err)
      }else {
        console.log('cameraSuccess')
        console.log(data)
        self.setState({
          picTaken:true,
          pic: data
        })
        this.props.action(data) //pass data back to action prop specified
      }
    });
    e.preventDefault();
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
      <Avatar className='pmcCameraAvatar' style={{'display':'block','height':'60px','width':'60px'}}
        icon={
          <FontIcon style={{'height':'30px','width':'30px'}} className='material-icons'>photo_camera</FontIcon>
          } />
        <a href='#' onClick={this._takePicture}> upload</a>
      </div>;


      if(this.state.picTaken ) {
        avatar = <div><Avatar className='pmcCameraAvatar' style={{'display':'block','height':'60px','width':'60px'}}
            src={this.state.pic} /><a href='#' onClick={this._takePicture}>Change</a></div>
      }
      else{
        avatar = avatar1;
      }
      return (
        <div style={styles.avatar}>
          {avatar}
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
