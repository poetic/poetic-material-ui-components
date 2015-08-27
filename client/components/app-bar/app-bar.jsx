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
		if(this.props.action == undefined)
		{
			throw("You must specify an action! if using an icon");
		}
		else
		{

			Router.go(this.props.action);	
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
			    'height': '65px !important',
			    'minHeight': '50px',
			    'paddingTop': '10px'
		}
  	if(this.props.icon)
  	{
  		icon = <IconButton
  			 	 iconClassName="material-icons"
	       		 onClick={this._handleAction}
	       	 	 tooltipPosition="bottom-center"
		       	 style={{'marginTop':'-8px'}}
  				 tooltip="Go Back">arrow_back
					</IconButton>
  	}
  	return (
  		<div>
			<AppBar id={this.props.barId} className='pmcAppBar' title={this.props.title}
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