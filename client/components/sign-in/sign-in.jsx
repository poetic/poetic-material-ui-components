/**
pmc._contact

Note: do not reference this class directly, it is to be used by pmc.contacts only!
      For a contact-like comoponent, please see pmc.contact.

Props
________
action: takes a reference to a callback handler which is called on successful login.
it returns the current userid to the callback handler specified.

**/

const {
  Dialog,
  TextField,
  LinearProgress,
  RaisedButton,
} = mui;


pmc.signIn = React.createClass({
  propTypes: {
    passwordless: React.PropTypes.bool,
    requestCodeAction: React.PropTypes.func,
    overrideAction: React.PropTypes.func,
    passwordlessAction: React.PropTypes.func,
    style: React.PropTypes.object,
    label: React.PropTypes.string,
    useSpinner: React.PropTypes.bool,
    spinner: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return { loading: false, error: '', mode: 'signIn' };
  },


  getChildContext() {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },

  componentDidMount() {
    $(React.findDOMNode(this)).css({ height: '100%', width: '100%' });
  },

  componentDidUpdate() {
    if (this.state.loading) {
      this._signIn();
    }
  },

  resetComponentState() {
    this.setState({
      loading: false,
      error: '',
      mode: 'signIn'
    });
  },

  _showDialog(e) {
    if (this.props.passwordless) {
      this.refs.sign_dialog_passwordless.show();
    } else if (this.props.overrideAction) {
      this.props.overrideAction();
    } else { this.refs.sign_dialog.show(); }

    e.preventDefault();
  },

  _errorResolver(err) {
    let errorMessage;
    switch (err.error) {
      case 400:
        errorMessage = 'Email and password are required';
      break;
      case 403:
        errorMessage = 'Incorrect email or password';
      break;
      default:
        errorMessage = 'Incorrect email or password';
    }
    return { errorMessage };
  },

  _requestCode() {
    this.props.requestCodeAction(this.refs.phone.getValue());
  },

  _signInPasswordless() {
    const phoneNumber = this.refs.phone.getValue();
    const code = this.refs.code.getValue();
    this.props.passwordlessAction({ phoneNumber, code });
  },

  _signIn() {
    const { overrideAction } = this.props;
    const self = this;
    const email = this.refs.email.getValue().toLowerCase();
    const password = this.refs.password.getValue();
    const dialog = this.refs.sign_dialog;

    const overrideActionSupplied = _.isFunction(overrideAction);

    if (overrideActionSupplied) {
      overrideAction();
    } else {
      Meteor.loginWithPassword(email, password, function validateResult(err) {
        if (err) {
          const errorMessage = self._errorResolver(err);
          self.setState({ loading: false, error: errorMessage });
        } else {
          dialog.dismiss();
          self.props.action(null, Meteor.userId());
        }
      });
    }
  },

  _resetDialogContent() {
    const errorText = this.state.error;
    return [
      <div>
        <p style={{ color: 'red' }}>
          { errorText }
        </p>
        <p style={{ textAlign: 'left' }}>
          The email entered below will be sent an email
          to reset your password.
        </p>
        <TextField
          hintText="Email"
          ref="resetEmail"
          type="email"
          fullWidth
        />
      </div>
    ];
  },

  _signInDialogContent() {
    const errorText = this.state.error;
    return [
      <div>
        <p style={{ color: 'red' }}>
          { errorText }
        </p>
        <TextField
          hintText="Email"
          ref="email"
          type="email"
          fullWidth
        />
        <TextField
          hintText="Password"
          ref="password"
          type="password"
          fullWidth
        />
      </div>
    ];
  },

  _triggerLoadingState() {
    this.setState({ loading: true });
  },

  _triggerResetState() {
    this.setState({ mode: 'reset' });
  },

  closeModal() {
    this.refs.sign_dialog.dismiss();
  },

  _sendResetEmail() {
    const resetEmail = this.refs.resetEmail.getValue();
    if (resetEmail) {
      Accounts.forgotPassword({ email: resetEmail }, err => {
        console.dir(err);
        if (err) {
          this.setState({ error: err.reason });
        } else {
          this.closeModal();
        }
      });
    } else {
      this.setState({ loading: false, error: errorMessage });
    }
  },

  _getResetModeActions() {
    const signInLinkStyle = this._getSignInStyle();
    return [
      <p
        style={{
          ...signInLinkStyle,
          textAlign: 'right',
          padding: '0px',
          marginBottom: '0px',
        }}
        ref="sign_btn"
        onClick={ this._sendResetEmail }
        >
        Reset Password
      </p>
    ];
  },

  _getSignInModeActions() {
    const signInLinkStyle = this._getSignInStyle();
    return [
      <p
        style={{
          ...signInLinkStyle,
          'float': 'left',
          padding: '0px',
          marginBottom: '0px',
        }}
        ref="sign_btn"
        onClick={ this._triggerLoadingState }
        >
        GO
      </p>,
      <p
        onClick={ this._triggerResetState }
        style={{
          ...signInLinkStyle,
          'float': 'right',
          padding: '0px',
          marginBottom: '0px',
        }}
        >
        FORGOT PASSWORD
      </p>
    ];
  },

  _getSignInActions() {
    const signInModeActions = this._getSignInModeActions();
    const resetModeActions = this._getResetModeActions();
    if (this.state.mode === 'signIn') {
      return signInModeActions;
    }
    return resetModeActions;
  },

  _getSignInStyle() {
    return {
      color: '#24e47a',
      padding: '15px',
      textDecoration: 'none',
      marginTop: '10px',
      marginBottom: '20px',
    };
  },

  _generateDialogContent() {
    if (this.state.mode === 'signIn') {
      return this._signInDialogContent();
    }
   return this._resetDialogContent();
  },

  render() {
    const style = _.extend({ paddingTop: '20px' }, this.props.style);
    const label = this.props.label || '';
    const progress = [];
    const signInLink = this._getSignInStyle();
    const dialogContent = this._generateDialogContent()

    if (this.state.loading && this.props.useSpinner) {
        goButton = this.props.spinner;
    }

    return (
      <div>
        <div style={ style }>
          <span>{ label }
            <a ref="sign_btn" onClick={ this._showDialog } href='#' style={signInLink}>SIGN IN </a>
          </span>
        </div>
        <Dialog
          title={ (this.state.mode === 'signIn') ? 'Sign IN' : 'Reset' }
          ref="sign_dialog"
          onDismiss={ this.resetComponentState }
          style={{
            marginLeft: '-5%',
            width: '110%'
          }}
        >
          { dialogContent }
          <div className="sign-go">
            { this._getSignInActions() }
          </div>
        </Dialog>
      </div>
    );
  },
});

Template.pmc_signIn.helpers({
  pmcSignIn() {
    return pmc.signIn;
  },
  _action() {
    return this.action;
  },
});


