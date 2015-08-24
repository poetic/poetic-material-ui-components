//Pick our components from mui
const {
  TextField,
  Menu,
  FontIcon,
  Checkbox,
  CircularProgress,
  RaisedButton
}= mui;

//Contact component ********Start Here*********
pmc._contact = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  contextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return{
      muiTheme: ThemeManager.getCurrentTheme()
    }   
  },
  getInitialState() {
    return {
      contact: this.props.contact,
      checked: false,
      image: '/unchecked.png'
    };
  },

    
  _handleContactCheck(e) {
    this.setState({
      checked: !this.state.checked,
      image: this.state.checked ? '/checked.png' : '/unchecked.png'
    });

    this.setState({
      image: this.state.checked ? '/checked.png' : '/unchecked.png'
    });

    this.props.feedback({
      status: this.state.checked,
      id: this.state.contact.id
    })

  },
  render() {

    

    return(
      <div>
      <div style={{'marginBottom':'20px','fontSize':'16px'}} onClick={this._handleContactCheck}>
        <img ref='image' className='ccheckbox' src={this.state.image} />
        {this.state.contact.name.givenName}
      </div>
    </div>
      )
  }

})
//Contact component ********END Here*********

pmc.contacts = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  contextTypes: {
        muiTheme: React.PropTypes.object
    },
  getChildContext() {
    return{
      muiTheme: ThemeManager.getCurrentTheme()
    }   
  },
  getInitialState() {
    return {
      contacts: [],
      chosenContacts: {}
    };
  },
  componentWillMount() {

    if (Meteor.isCordova & !this.state.contacts.length){

      let cSort = function(a, b) {
        aName = a.name.givenName;
        bName = b.name.givenName;
        return aName < bName ? -1 : (aName == bName ? 0 : 1);
      };
      function onSuccess(conts) {
        conts.sort(cSort);
        console.log('contacts set!');
        this.setState({contacts:conts});
      }
      function onError(contactError) {
        alert("Error! couldnt read contacts");
      };
      navigator.contacts.find(["*"], onSuccess.bind(this), onError);
    }
  
  },
  _handleImportContacts() {

  },
  _contactHandler(contactObj) {
    if(contactObj.status) {
      let obj = this.state.chosenContacts;
      obj[contactObj] = true;
      this.setState({
        chosenContacts: obj
      })
    }
    console.dir(contactObj);
  },
  _filterContacts() {

  },
  
  render() {

    let styles = {
      contacts: {
        'height': '80%',
        'width': '325px',
        'overflowX': 'hidden',
        'overflowY': 'scroll',
        'WebkitOverflowScrolling': 'touch',
        'position': 'absolute',
      },
      zero:{
        'height': screen.height - 65,
        'width': screen.width - 20
      }
    }

    let spinner = <CircularProgress mode="indeterminate" size={5} ></CircularProgress>;

    let contacts = this.state.contacts.map(function(contact,index){
          if (contact.name.givenName)
          {
            return <pmc._contact key={index} contact={contact} feedback={this._contactHandler} /> 
          }   
      }.bind(this))


    return (
      <div>
      <pmc.appBar icon={true} action='/trainer/dashboard' title='IMPORT CLIENTS' />
      
      <div className='' style={styles.zero}>
        <div style={{'width':'100%'}}>
          <FontIcon className="material-icons">search</FontIcon>
          <TextField hintText="Search contacts" fullWidth={true} onChange={this._filterContacts} />
        </div>
        <div style={styles.contacts}>
          {
            (contacts.length) ? contacts : spinner

          }
        </div>
        <RaisedButton label='Add TO CLIENT LIST'
          onClick={this._handleImportContacts}
              labelStyle={{'lineHeight':'30px','display':'block','color': '#979797','fontSize':'24px'}}
              backgroundColor='#c0f948' style={{'marginLeft':'20px','marginRight':'20px','width':'280px','height':'70px','position':'absolute','bottom':'0px'}} />
       </div>
      </div>
      )
  }
})

Template.pmc_contacts.helpers({
  handler () {
    return this.action
  },
  contacts() {

    return pmc.contacts;
  }
})