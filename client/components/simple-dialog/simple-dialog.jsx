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

  _onDialogSubmit(e) {
    this.refs.pmc_sdialog.dismiss();
    let isFunction = _.isFunction(this.props.action)

    if(isFunction) {
      this.props.action();
    }
  },

  render() {
    let title = this.props.title || 'Dialog';
    let body = this.props.body;

    let standardActions = [
      { text: 'Ok', onTouchTap: this._onDialogSubmit, ref: 'okButton'  }
    ];
    return (
      <Dialog
        title={title}
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
