const { TextField } = mui;
pmc.phoneInput  = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext: function() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  componentDidMount() {
    let target = this.refs.phone.getDOMNode()
    let self = this
    $(target).keyup(function(event){
      if(event.keyCode !== 8 ){
        self.changed()
      }
    })
  },
  getValue() {
    let value = this.refs.phone.getValue()
    return value
  },
  changedHandler() {
    let {onChange} = this.props
    let hasValidListener = _.isFunction(onChange)

    if(hasValidListener) {
      let value = this.refs.phone.getValue()
      onChange(value)
    }

  },
   changed(event) {
     let target = this.refs.phone.getDOMNode()
     let value = this.refs.phone.getValue()

     let nonStrings = /\D/g
     let numberValues = value.replace(nonStrings,'')
     let firstThree = numberValues.substring(0,3)
     firstThree = (firstThree.length === 3) ? '(' + firstThree + ') ' : firstThree
     let secondThree = numberValues.substring(3,6)
     secondThree = (secondThree.length === 3) ? secondThree + '-' : ( secondThree || '')
     let lastFour = numberValues.substring(6,10)
     lastFour = lastFour  || ''

     let maskedValue = firstThree + secondThree + lastFour
     this.refs.phone.setValue(maskedValue)
   },
   render: function() {
     let hintText = this.props.hintText || '(xxx) xxx-xxxx'
     return (
       <TextField
         ref='phone'
         type='tel'
         hintText={hintText}
         fullWidth={true}
         onChange={this.changedHandler}
       />
     );
   }
});

Template.pmc_phoneInput.helpers({
  pmcPhoneInput(){
    return pmc.phoneInput
  },
});

