const {
  Dialog,
}= mui;

pmc._dialog = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
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
      { text: buttons.cancel },
      { text: buttons.confirm, onTouchTap: this._onDialogSubmit, ref: 'submit' }
    ];
    return (
      <Dialog
        title={title} ref='sign_dialog'
        actions={standardActions}
        openImmediately={true}
        ref='pmc_dialog'
        >
        {
          this.props.body
        }
      </Dialog>
    )
  }
})
