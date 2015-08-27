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

pmc.showSpinner = function() {
  $('body').prepend("<div id='spinner'> </div>");
  $('#spinner').css({
    'background-color' : 'white',
    'position': 'absolute'
  })
  let spinner = React.createElement(pmc.spinner,{show:true});
  React.render(spinner,document.getElementById('spinner'))
}
pmc.hideSpinner = function() {
  React.unmountComponentAtNode(document.getElementById('spinner'),pmc.spinner)
} 

Template.pmc_spinner.helpers({
  spinner(){
    return pmc.spinner;
  },
})