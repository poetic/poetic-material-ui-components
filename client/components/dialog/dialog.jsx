const {
  Dialog,
} = mui;

pmc._dialog = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _onDialogCancel(e) {
    this.refs.pmc_dialog.dismiss();
    const { actionCancel } = this.props;
    if (_.isFunction(actionCancel)) {
      actionCancel();
    }
  },

  _onDialogSubmit(e) {
    this.refs.pmc_dialog.dismiss();
    this.props.action();
  },

  render() {
    let title = this.props.title;
    let body = this.props.body;
    let buttons = this.props.buttonText || {confirm: 'Continue', cancel: 'Cancel'};
    let standardActions = [
      { text: buttons.cancel, onTouchTap: this._onDialogCancel },
      { text: buttons.confirm, onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    return (
      <Dialog
        title={title} ref='sign_dialog'
        actions={standardActions}
        openImmediately={true}
        ref='pmc_dialog'
        style={{marginLeft: '-5%', width: '110%'}}
        >
        {
          this.props.body
        }
      </Dialog>
    )
  }
})
