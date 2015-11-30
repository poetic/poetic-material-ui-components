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
  LinearProgress,
  RaisedButton
} = mui;


pmc.signIn = React.createClass({

  getInitialState() {
    return { loading: false, error: '' };
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },

  componentDidUpdate() {
    if(this.state.loading){
      this._signIn();
    }
  },

  componentDidMount() {
    $(React.findDOMNode(this)).css({ 'height':'100%', 'width':'100%' });
  },

  _showDialog(e) {
    if(this.props.passwordless) {
      this.refs.sign_dialog_passwordless.show();
    } else { this.refs.sign_dialog.show(); }

    e.preventDefault();
  },

  _requestCode() {
    this.props.requestCodeAction(this.refs.phone.getValue());
  },

  _signInPasswordless() {
    let phoneNumber = this.refs.phone.getValue(),
        code = this.refs.code.getValue();

    this.props.passwordlessAction({ phoneNumber, code});
  },

  _signIn() {
    let self = this,
        email = this.refs.email.getValue().toLowerCase(),
        password = this.refs.password.getValue(),
        dialog = this.refs.sign_dialog;

    Meteor.loginWithPassword( email, password, function(err){
      if(err) {
        self.setState({ loading: false, error: err.reason });
      } else {
        dialog.dismiss();
        self.props.action(null, Meteor.userId());
      }
    });
  },

  _triggerLoadingState() {
    this.setState({ loading: true });
  },

  closeModal() {
    this.refs.sign_dialog.dismiss();
  },

  render() {
    let style = _.extend({paddingTop: '20px'}, this.props.style);
    let label = this.props.label || '';
    let progress = []
    let errorText = this.state.error

    let goButton = <RaisedButton
                    fullWidth={true}
                    ref='sign_btn'
                    href='#'
                    onClick={this._triggerLoadingState}
                    primary={true}
                    label='GO'
                    />;

    if(this.state.loading) {
      progress.push(<LinearProgress mode="indeterminate"  />)
      if(this.props.fpn){
        goButton = LoadingHtml;
      }
    }


    let signInLink = {
      color: '#24e47a',
      padding: '15px',
      textDecoration: 'none',
      marginTop: '10px',
      marginBottom: '20px'
    };

    return (
      <div>
        <div style={style}>
          <span>{label} <a ref='sign_btn' onClick={this._showDialog} href='#' style={signInLink}>SIGN IN </a></span>
        </div>

        <Dialog
        title="Sign In" ref='sign_dialog' style={{marginLeft: '-5%', width: '110%'}}>
          <p style={{'color': 'red'}}> {errorText} </p>
          {progress}
          <TextField
          hintText="Email" ref='email' type='email' fullWidth={true} />
          <TextField
          hintText="Password" ref='password' type='password' fullWidth={true} />

          <div className="sign-go">
            {goButton}
          </div>
        </Dialog>

        <Dialog
        title="Sign In" ref='sign_dialog_passwordless' style={{marginLeft: '-5%', width: '110%'}}>
          <pmc.phoneInput ref='phone' />
          <TextField
          hintText="Enter code recieved" ref='code' fullWidth={true} />
          <a ref='request_btn' href='#' onClick={this._requestCode} style={{'textDecoration':'none','float':'left'}}>Request Code</a>
          <a ref='sign_btn_passwordless' href='#' onClick={this._signInPasswordless} style={{'textDecoration':'none','float':'right'}}>GO</a>
        </Dialog>
      </div>
    )
  }
});

Template.pmc_signIn.helpers({
  pmcSignIn() {
    return pmc.signIn;
  },
  _action() {
    return this.action;
  }
});

let LoadingHtml = <div className="trainer-button spinner--wave">
    <div className="spinner-item" style={{marginLeft: "2px"}}></div>
    <div className="spinner-item" style={{marginLeft: "2px"}}></div>
    <div className="spinner-item" style={{marginLeft: "2px"}}></div>
    <div className="spinner-item" style={{marginLeft: "2px"}}></div>
    <div className="spinner-item" style={{marginLeft: "2px"}}></div>
  </div>;
