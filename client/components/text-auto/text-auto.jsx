const {
  TextField
} = mui

pmc.textAuto = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  getInitialState() {
    return({
      activeObject: null
    })
  },
  updateActiveState(suggestion,dataset){

    this.setState({
      activeObject:{
        suggestion: suggestion,
      }
    })

    if(this.props.dataSelect){
      self.props.dataSelect(e,suggestion,dataset)
    }
  },
  getValue() {
    return this.state.activeObject
  },
  setValue(value) {
    let TextField = this.refs.typeaheadContainer
    TextField.setValue(value)
  },
  clear() {
    let textAuto = this.refs.typeaheadContainer
    textAuto.clearValue()
  },
  componentDidMount(){
    Meteor.typeahead.inject();
    let typeaheadContainer = this.refs.typeaheadContainer.getDOMNode()
    let typeaheadInput = $(typeaheadContainer).find('input')[0]
    let self = this

    $(typeaheadInput).on('typeahead:select',function(e,suggestion){
      self.updateActiveState(suggestion)
    })
    $(typeaheadInput).on('typeahead:cursorchange',function(e,suggestion){
      self.updateActiveState(suggestion)
    })

    Meteor.typeahead(typeaheadInput,this.typeaheadSource)
  },

  typeaheadSource(query,syncTypeahead,asyncTypeahead){
    let dataSource = this.props.dataSource
    let result =[]

    _.each(dataSource,function(dataItem){
      let suggestion = dataItem.suggestion.toLowerCase()
      let matchesQuery = suggestion.indexOf(query.toLowerCase())
      matchesQuery = matchesQuery != -1

      if(matchesQuery){
        result.push(
          {
            value:dataItem.suggestion,
            obj: dataItem
          }
        )
      }
    });
    syncTypeahead(result)
  },
  render(){
    let {label,hintText,defaultValue} = this.props
    defaultValue = defaultValue

    let component =
      <TextField
        floatingLabelText={label}
        hintText={hintText}
        ref='typeaheadContainer'
      />
      if(defaultValue) {
        component =
          <TextField
            floatingLabelText={label}
            defaultValue={defaultValue}
            hintText={hintText}
            ref='typeaheadContainer'
          />

      }
    return component
  }
})
