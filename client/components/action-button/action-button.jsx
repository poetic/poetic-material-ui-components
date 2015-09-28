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
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentWillMount() {
    if(!this.props.label){
      throw new Error("You must specify a label for action button");
    }
  },
  _handleAction(e) {
    this.props.action();
  },
  render() {
    let style = _.extend({
      'width': '100%',
      'height':'100%',
      'position':'relative',
    },this.props.style);
    let labelStyle =
      _.extend({
      'lineHeight':'30px',
      'display':'block',
      'color': '#979797',
      'fontSize':'24px'
    },this.props.labelStyle)
let disabled = false;

if(this.props.track !== undefined) {
  disabled = !this.props.track
}

      return (
        <div>
        <RaisedButton
        ref='actionButton'
        label={this.props.label}
        onClick={this.props.action ? this._handleAction : null}
        type = {this.props.action == undefined ? 'submit' : 'button'}
        labelStyle={labelStyle}
        disabled={disabled}
        primary={true}
        style={style} />
        </div>
      )
    }
})

Template.pmc_actionButton.helpers({
  _action(){
    return this.action;
  },
  _track() {
   return this.track;
  },
  actionButton() {
    return pmc.actionButton
  }
})
