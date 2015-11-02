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
  _handleContactClick(e) {
    this.props.action(this.props.contact);
  },
  componentDidMount(){
    let comoponentDomNode = React.findDOMNode(this)
    comoponentDomNode = $(comoponentDomNode).children()[0]

    if(this.props.height){
      $(comoponentDomNode).css({
        height: this.props.height + 'px'
      })
    }
    $(comoponentDomNode).find('.material-icons').css({
      'margin-right': '20.1px',
      fill: '#000000'
    }).addClass('pmcContactIcon')

    $(comoponentDomNode).find('a div div').css({
      'margin-left': '19px',
    }).addClass('pmcContactText')
  },
  render() {
    let styles ={
      Avatar: {
        height: '60px',
        width: '60px'
      }
    }
    let avatarSize = this.props.size || 40
    let image = this.props.image || "/userplaceholderimage.png" ;
    return(
      <div>
      <ListItem primaryText={this.props.contact.client.name}
        disableFocusRipple={true}
        disableTouchRipple={true}
        rightIcon={<FontIcon className="material-icons">keyboard_arrow_right</FontIcon>}
        leftAvatar={<Avatar src={image} size={avatarSize}/>}
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
