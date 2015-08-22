const {
  Dialog,
  TextField,
  RaisedButton
} = mui


pmc.signIn = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentWillMount() {
    this.setState({
      
    })
  },
  _showDialog(e) {
    this.refs.sign_dialog.show();
    e.preventDefault();
  },
  _signIn() {
    let self = this;
    Meteor.loginWithPassword(this.refs.email.getValue(), this.refs.password.getValue(),function(err){
      if(err) {
        alert(err.reason)
      }else{
        Router.go(self.props.route)
      }

    })
  },
  render() {
    //if no action prop supplied
    let action = (this.props.action == undefined) ? '#' : this.props.action
    return ( 
      <div>
        <br/>
        <span>BEEN HERE, DONE THAT? <a ref='sign_btn' onClick={this._showDialog} href='#' style={{'color': '#c0f948', 'textDecoration':'none'}}>SIGN IN </a></span>
        <Dialog
          title="Sign In" ref='sign_dialog'>
          <TextField
            hintText="Email" ref='email' fullWidth={true} />
          <TextField
             hintText="Password" ref='password' type='password' fullWidth={true} />
         <a ref='sign_btn' href='#' onClick={this._signIn} style={{'color': '#c0f948', 'textDecoration':'none','float':'right'}}>GO</a>
        </Dialog>
      </div>  
    )
  }
})




Template.pmc_signIn.helpers({
  pmcSignIn() {
    return pmc.signIn;
  },
  _action() {
    return this.action;
  }
})