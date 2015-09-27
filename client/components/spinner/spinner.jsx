const {
  CircularProgress,
}= mui;

pmc.spinner = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  _handleAction(e) {
    this.props.action();
  },
  render() {
    let spinner = <div><CircularProgress ref='spinner' mode="indeterminate" size={5} ></CircularProgress></div>;
    return (
      this.props.show ? spinner : null
    )
  }
})


Template.pmc_spinner.helpers({
  spinner(){
    return pmc.spinner;
  },
})
