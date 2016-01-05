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

  getInitialState() {
    return { loading: false,};
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },

  componentDidMount() {
    let domNode = React.findDOMNode(this)
    $(domNode).css({
      'height':'100%',
      'width':'100%'
    })
  },

  componentWillMount() {
    if(!this.props.label){
      throw new Error("You must specify a label for action button");
    }
  },

  resetState() {
    this.setState({
      loading: false
    })
  },

  _handleAction(e) {
    this.setState({
      loading:true
    })

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
      'color': '#7F7F7F',
      'fontSize':'24px'
    },this.props.labelStyle)
    let disabled = false;

    if(this.props.track !== undefined) {
      disabled = !this.props.track
    }

    let actionButton =[
      <RaisedButton
      ref='actionButton'
      label={this.props.label}
      onClick={this.props.action ? this._handleAction : null}
      type = {this.props.action == undefined ? 'submit' : 'button'}
      labelStyle={labelStyle}
      disabled={disabled}
      primary={true}
      style={style} />
    ]


    if(this.state.loading) {
      if(this.props.useSpinner){
        actionButton =[this.props.spinner];
      }
    }

    return (
      <div>
      {actionButton}
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
