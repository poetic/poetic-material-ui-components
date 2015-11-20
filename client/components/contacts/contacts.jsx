/**
pmc.contacts

Props
___________

action: takes a reference to callback handler which recieves an object of all chosen contacts

**/


/**
pmc._contact

Note: do not reference this class directly, it is to be used by pmc.contacts only!
      For a contact-like comoponent, please see pmc.contact.

Props
________
feedback: takes a reference to the callback handler, _contactHandler() in pmc.contacts. it passes the updated state of the contact component

**/

//Pick our components from mui
const {
  TextField,
  Menu,
  FontIcon,
  Checkbox,
  CircularProgress,
  RaisedButton
}= mui;

//-------pmc.contact-------
pmc._contact = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  contextTypes: {
    muiTheme: React.PropTypes.object,
  },
  getInitialState() {
    return {
      contact: this.props.contact,
      index: this.props.index,
      checked: false,
      image: '/unchecked.png'
    };
  },


  _handleContactCheck(e) {
    let label = e.currentTarget;
    let status = $(label).find('.checkbox')[0].checked;

    this.props.feedback({
      status: status,
      id: this.state.contact.id,
      index: this.state.index
    })

    this.setState({
      checked : status
    })

  },
  render() {
    let show = true;
    let contact = null;

    //check if filter prop is empty
    if (!_.isEmpty(this.props.filter)) {

      let found = _.indexOf(this.props.filter, this.state.contact.id);

      //set show to false if not found
      if(found === -1) {
        show = false;
      }
    }

    if(show) {
      contact =  <div onClick={this._handleContactCheck}>
        <label className="pmcLabelCheckbox">
          <input type="checkbox" className="checkbox" checked ={this.state.checked} />
           {this.state.contact.name.givenName + ' ' + (this.state.contact.name.familyName || '') }
        </label>
      </div>
    }
    return(
      <div>
      {
        show ? contact : null
      }
      </div>
    )
  }

})
//********End pmc.contact*********

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
      chosenContacts: {},
      filteredContacts:[]
    };
  },
  componentWillMount() {

    if (Meteor.isCordova){

      let cSort = function(a, b) {
        aName = a.name.givenName;
        bName = b.name.givenName;
        return aName < bName ? -1 : (aName == bName ? 0 : 1);
      };
      function onSuccess(conts) {
        conts.sort(cSort);
        this.setState({contacts:conts});
      }
      function onError(contactError) {
        alert("Error! couldnt read contacts");
      };
      navigator.contacts.find(["*"], onSuccess.bind(this), onError);
    }
  },

  //This simply passes all chosen contacts as a single object, to the callback passed
  _handleImportContacts() {
    this.props.action(this.state.chosenContacts)
  },

  // Handles on click handler for each contact component.
  // Adds or deletes a contact as the case arises
  _contactHandler(contactObj) {
    let obj = this.state.chosenContacts;

    //Check if contact was selected
    if(contactObj.status) {
      obj[contactObj.id] = this.state.contacts[contactObj.index];
      this.setState({
        chosenContacts: obj
      })
    }else {
      delete obj[contactObj.id];
    }
  },

  // Handles filtering of contacts, filtered and accepted contacts will have their Id's stored in the
  //  filteredContacts state variable
  _filterContacts(e) {
    let cSearch = new RegExp(e.currentTarget.value,'gi'); //global and case insensitive search
    let self = this;

    let fContacts =  _.map(this.state.contacts,function(contact){

      if (cSearch.test(contact.name.givenName)) {
        return contact.id;
      }
    }.bind(this))

    this.setState({
      filteredContacts: fContacts
    })

  },

  render() {
    let contactsHeight = screen.height - 215;
    let actionButtonTop = contactsHeight + 125;
    let styles = {
      contacts: {
        'height': contactsHeight,
        'width': '100%',
        'overflowX': 'hidden',
        'overflowY': 'scroll',
        'WebkitOverflowScrolling': 'touch',
        'position': 'absolute',
      },
      searchIcon: {
        'display': 'inline-block',
        'width': '16px'
      },
      searchBar: {
        'textIndent': '30px',
        'display': 'inline-block',
      },
      actionButton: {
        position:'absolute',
        'marginLeft':'20px',
        'marginRight':'20px',
        'width': screen.width - 40,
        'height':'70px',
        top: actionButtonTop
      }
    }

    let spinner = <CircularProgress mode="indeterminate" size={5} ></CircularProgress>;

    let contacts = this.state.contacts.map(function(contact,index){
        if (contact.name.givenName)
        {
          return <pmc._contact key={contact.id} contact={contact} filter={this.state.filteredContacts} feedback={this._contactHandler} index={index} />
        }
      }.bind(this))


    return (
      <div>
        <pmc.appBar icon='arrow_back' action={this.props.cancel} title='IMPORT CLIENTS' />
        <div style={{'marginTop':'65px'}}>
          <div style={{'height':'60px'}}>
            <FontIcon className="material-icons" color='#3a3a3a' style={{'top':'20px'}} >search</FontIcon>
            <TextField hintText="Search contacts" onChange={this._filterContacts} fullWidth={true} style={styles.searchBar} />
          </div>
          <div style={styles.contacts}>
            {
              (contacts.length) ? contacts : spinner

            }
          </div>
        </div>
        <pmc.actionButton label='Add TO CLIENT LIST' action={this._handleImportContacts} style={styles.actionButton} />
      </div>
    )
  }
})

Template.pmc_contacts.helpers({
  _action () {
    return this.action
  },
   cancel () {
    return this.cancel
  },
  contacts() {

    return pmc.contacts;
  }
})
