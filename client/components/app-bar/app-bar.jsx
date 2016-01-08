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
  _handleActionRight() {
    //Throw error if no action is supplied
    if(this.props.actionRight === undefined)
      {
        throw("You must specify an action! if using an icon");
      }
      else
        {

          this.props.actionRight();
        }
  },
  render() {
    let icon = false;
    let iconRight = false;
    let styles = {};

    styles.appBar = {
      'top':'0px',
      'position': 'fixed',
      'backgroundColor':'#2a2a2a',
      'font-color':'white',
      'text-align': 'center',
      'fontFamily': 'Roboto-Regular !important',
      'fontSize': '16px',
      'textAlign': 'center',
      'width' : '100%',
      height: '50px',
      lineHeight: '50px',
    };

    if(this.props.icon)
      {
        icon = <IconButton
          iconClassName="material-icons app-bar leftIcon"
          onClick={this._handleAction}
          tooltipPosition="bottom-center"
          style={{
            position: 'relative',
            top: '-8px',
            lineHeight: '90px'
          }}
          >{this.props.icon}
        </IconButton>
      }
    if(this.props.iconRight)
      {
        iconRight = <IconButton
          iconClassName={"material-icons app-bar rightIcon " + this.props.iconRightAppendClass}
          onClick={this._handleActionRight}
          tooltipPosition="bottom-center"
          style={{margin:'none !important', height: '50px' }}
          >{this.props.iconRight}
        </IconButton>
      }
      return (
        <div>
          <AppBar id={this.props.barId} className='pmcAppBar' title={this.props.title.toUpperCase()}
            showMenuIconButton={(this.props.icon) ? true : false }
            iconElementLeft={icon}
            iconElementRight={iconRight}
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
