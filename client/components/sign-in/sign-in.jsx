/**
pmc._contact

Note: do not reference this class directly, it is to be used by pmc.contacts only!
      For a contact-like comoponent, please see pmc.contact.

Props
________
action: takes a reference to a callback handler which is called on successful login. it returns the current userid to the callback handler specified.

**/

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
  componentDidMount() {
    let domNode = React.findDOMNode(this)
    $(domNode).css({
      'height':'100%',
      'width':'100%'
    })
  },
  _showDialog(e) {
    this.refs.sign_dialog.show();
    e.preventDefault();
  },
  _signIn() {
    let self = this;
    let email = this.refs.email.getValue().toLowerCase();
    let password = this.refs.password.getValue();

    Meteor.loginWithPassword(email,password ,function(err){
      if(err) {
        alert(err.reason)
      }else{
        let userId = Meteor.userId();
        self.props.action(userId);
      }

    })
  },
  render() {
    let style = _.extend({},this.props.style)

    let label = this.props.label || '';

    return (
      <div>
      <div style={style}>
      <span>{label} <a ref='sign_btn' onClick={this._showDialog} href='#' style={{'textDecoration':'none'}}>SIGN IN </a></span>
      </div>
      <Dialog
      title="Sign In" ref='sign_dialog'>
      <TextField
      hintText="Email" ref='email' type='email' fullWidth={true} />
      <TextField
      hintText="Password" ref='password' type='password' fullWidth={true} />
      <a ref='sign_btn' href='#' onClick={this._signIn} style={{'textDecoration':'none','float':'right'}}>GO</a>
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
