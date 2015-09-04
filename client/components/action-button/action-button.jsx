/**
pmc.actionButton

Props
___________

action: takes a reference to callback handler which recieves an object of all chosen contacts

**/

const {
  RaisedButton
} = mui

pmc.actionButton = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: mui.Styles.ThemeManager().getCurrentTheme()
    };
  },
  componentWillMount() {
    if(this.props.label == undefined){
      throw new Error("You must specify a label for action button");
    }
  },
  _handleAction(e) {
    this.props.action();
  },
  render() {
    // let top = screen.height * .75;
    let width = screen.width - 40;
    let styles ={
      root:{
        'marginLeft':'20px',
        'marginRight':'20px',
        'width': width,
        'height':'70px',
        'position':'absolute',
      },
      label:{
        'lineHeight':'30px',
        'display':'block',
        'color': '#979797', 
        'fontSize':'24px'
      }
    }

    return ( 
      <div>
       <RaisedButton
        label={this.props.label}
        onClick={this.props.action ? this._handleAction : null}
        type = {this.props.action == undefined ? 'submit' : 'button'}
        labelStyle={styles.label}
        backgroundColor='#c0f948'
        style={(this.props.style == undefined) ? styles.root : this.props.style} />
      </div>  
    )
  }
})

Template.pmc_actionButton.helpers({
  _action(){
    return this.action;
  },
  actionButton() {
    return pmc.actionButton
  }
})