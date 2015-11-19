const {
  Dialog,
}= mui;

pmc._sdialog = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  render() {
    let title = this.props.title || 'Dialog';
    let body = this.props.body;

    let standardActions = [
      { text: 'Ok' }
    ];
    return (
      <Dialog
        title={title} ref='sign_dialog'
        actions={standardActions}
        openImmediately={true}
        ref='pmc_sdialog'
        style={{marginLeft: '-5%', width: '110%'}}
        >
        {
          this.props.body
        }
      </Dialog>
    )
  }
})
