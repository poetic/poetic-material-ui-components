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
    return { loading: false, error: '' };
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


  _showDialog(e) {
    if (this.props.passwordless) {
      this.refs.sign_dialog_passwordless.show();
    } else if (this.props.overrideAction) {
      this.props.overrideAction();
    } else { this.refs.sign_dialog.show(); }

    e.preventDefault();
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
          let errorMessage = '';
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
          self.setState({ loading: false, error: errorMessage });
        } else {
          dialog.dismiss();
          self.props.action(null, Meteor.userId());
        }
      });
    }
  },

  _triggerLoadingState() {
    this.setState({ loading: true });
  },

  closeModal() {
    this.refs.sign_dialog.dismiss();
  },

  render() {
    const style = _.extend({ paddingTop: '20px' }, this.props.style);
    const label = this.props.label || '';
    const progress = [];
    const errorText = this.state.error;

    let goButton = (
      <RaisedButton
        fullWidth={true}
        ref={'sign_btn'}
        href={'#'}
        onClick={this._triggerLoadingState}
        primary={true}
        label={'GO'}
      />
    );

    if (this.state.loading) {
      progress.push(<LinearProgress mode="indeterminate"  />);
      if (this.props.useSpinner) {
        goButton = this.props.spinner;
      }
    }


    const signInLink = {
      color: '#24e47a',
      padding: '15px',
      textDecoration: 'none',
      marginTop: '10px',
      marginBottom: '20px',
    };

    return (
      <div>
        <div style={style}>
          <span>{label}
            <a ref='sign_btn' onClick={this._showDialog} href='#' style={signInLink}>SIGN IN </a>
          </span>
        </div>

        <Dialog
        title="Sign In" ref="sign_dialog" style={{marginLeft: '-5%', width: '110%'}}>
          <p style={{'color': 'red'}}> {errorText} </p>
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


