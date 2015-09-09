/**
pmc.contact

Props
___________

action: takes a reference to a callback handler which recieves an object representing the contact clicked
contact: the contact object to be rendered, this should udeally be a meteor user object.

**/

const {
  Avatar,
  FontIcon,
  List,
  ListItem,
  ListDivider
}= mui;

pmc.contact = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getChildContext() {
    return{
      muiTheme: ThemeManager.getCurrentTheme()
    }   
  },
  _handleContactClick(e) {
    this.props.action(this.props.contact);
  },
  render() {
    let styles ={
      Avatar: {
        height: '60px',
        width: '60px'
      }
    }
    return(
      <div>
      <ListItem primaryText={this.props.contact.profile.name}
        disableFocusRipple={true}
        disableTouchRipple={true}
        rightIcon={<FontIcon className="material-icons">keyboard_arrow_right</FontIcon>}
        leftAvatar={<Avatar src="/userplaceholderimage.png"  />}
        onClick={this._handleContactClick}
         />
      <ListDivider />
      </div>
    )
  }

})

Template.pmc_contact.helpers({
  _action () {
    return this.action
  },
  contact() {
    return pmc.contact
  }
})