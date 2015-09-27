/**
  pmc.appBar

  Props
  ___________

action: takes a reference to callback handler which should handle the event when the left icon is clicked.
Note: for the action prop to be used, you must pass an icon string through the "icon" prop

title: The title to be displayed on the app bar

icon: takes a string that should correspond to a google material icon. Note, use underscores between words of the icon and not spaces

 **/

const {
  AppBar,
  IconButton
}  = mui

pmc.appBar = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  _handleAction() {
    //Throw error if no action is supplied
    if(this.props.action === undefined)
      {
        throw("You must specify an action! if using an icon");
      }
      else
        {

          this.props.action();
        }
  },
  render() {
    let icon=false;
    let styles = {};

    styles.appBar = {
      'top':'0px',
      'position': 'fixed',
      'backgroundColor':'#2a2a2a',
      'font-color':'white',
      'text-align': 'center',
      'fontFamily': 'Roboto-Regular !important',
      'fontSize': '20px',
      'textAlign': 'center',
      'width' : '100%',
      'height': '50px !important',
      'minHeight': '50px',
    }
    if(this.props.icon)
      {
        icon = <IconButton
          iconClassName="material-icons"
          onClick={this._handleAction}
          tooltipPosition="bottom-center"
          style={{'marginTop':'-8px'}}
          tooltip="Go Back">{this.props.icon}
        </IconButton>
      }
      return (
        <div>
          <AppBar id={this.props.barId} className='pmcAppBar' title={this.props.title.toUpperCase()}
            showMenuIconButton={(this.props.icon) ? this.props.icon : false }
            iconElementLeft={icon}
            style={styles.appBar} />
        </div>
      )
  }
})

Template.pmc_appBar.helpers({
  pmcAppBar() {
    return pmc.appBar;
  },
  _action() {
    return this.action;
  }
})
