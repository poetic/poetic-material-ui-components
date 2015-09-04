const {
  Dialog,
}= mui;

pmc.dialog = React.createClass({
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
    let title = this.props.title || 'Dialog';
    let body = this.props.body;

    let standardActions = [
      { text: 'Cancel' },
      { text: 'Continue', onTouchTap: this._onDialogSubmit, ref: 'submit' }
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

pmc.showDialog = function(obj) {
  $('body').prepend("<div id='dialog'> </div>");
  let dialog = React.createElement(pmc.dialog,obj);
  React.render(dialog,document.getElementById('dialog'))
}
pmc.hideDialog = function() {
  React.unmountComponentAtNode(document.getElementById('spinner'),pmc.spinner)
}