const { TextField, FontIcon, CircularProgress } = mui;

function cSort(a, b) {
  const aName = a.name.givenName;
  const bName = b.name.givenName;
  const res = (aName === bName ? 0 : 1);
  return aName < bName ? -1 : res;
}

function onSuccess(conts) {
  conts.sort(cSort);
  this.setState({ contacts: conts });
}

pmc._contact = React.createClass({
  propTypes: {
    contact: React.PropTypes.object,
    index: React.PropTypes.number,
    feedback: React.PropTypes.object,
    filter: React.PropTypes.filter,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      contact: this.props.contact,
      index: this.props.index,
      checked: false,
      image: '/unchecked.png',
    };
  },

  _handleContactCheck(e) {
    const label = e.currentTarget;
    const status = $(label).find('.checkbox')[0].checked;
    this.setState({ checked: !status });

    this.props.feedback({
      status: !status,
      id: this.state.contact.id,
      index: this.state.index,
    });
  },

  render() {
    let show = true;
    let contact = null;

    if (!_.isEmpty(this.props.filter)) {
      const found = _.indexOf(this.props.filter, this.state.contact.id);
      if (found === -1) {
        show = false;
      }
    }

    if (show) {
      contact = (
        <div className="contactContainer" onClick={this._handleContactCheck}>
          <label className="pmcLabelCheckbox">
          <input type="checkbox" className="checkbox" checked ={this.state.checked} />
          {this.state.contact.name.givenName + ' ' + (this.state.contact.name.familyName || '') }
          </label>
        </div>
      );
    }

    return (
      <div>
      {
        show ? contact : null
      }
      </div>
    );
  },
});
// ********End pmc.contact*********

pmc.contacts = React.createClass({
  propTypes: {
    action: React.PropTypes.func,
    loader: React.PropTypes.object,
    cancel: React.PropTypes.func,
  },

  contextTypes: {
    muiTheme: React.PropTypes.object,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return {
      contacts: [],
      chosenContacts: {},
      filteredContacts: [],
    };
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme(),
    };
  },

  componentWillMount() {
    if (Meteor.isCordova) {
      navigator.contacts.find(['*'], onSuccess.bind(this));
    }
  },

  // This simply passes all chosen contacts as a single object, to the callback passed
  _handleImportContacts() {
    this.props.action(this.state.chosenContacts);
  },

  // Handles on click handler for each contact component.
  // Adds or deletes a contact as the case arises
  _contactHandler(contactObj) {
    const obj = this.state.chosenContacts;

    // Check if contact was selected
    if (contactObj.status) {
      obj[contactObj.id] = this.state.contacts[contactObj.index];
      this.setState({ chosenContacts: obj });
    } else {
      delete obj[contactObj.id];
    }
  },

  _filterContacts(e) {
    const cSearch = new RegExp(e.currentTarget.value, 'gi');
    const fContacts = _.map(this.state.contacts, (contact) => {
      if (cSearch.test(contact.name.formatted)) {
        return contact.id;
      }
    });

    this.setState({ filteredContacts: fContacts });
  },

  render() {
    const contactsHeight = screen.height - 215;
    const actionButtonTop = contactsHeight + 125;
    const styles = {
      contacts: {
        height: contactsHeight,
        width: '100%',
        overflowX: 'hidden',
        overflowY: 'scroll',
        WebkitOverflowScrolling: 'touch',
        position: 'absolute',
      },
      searchIcon: {
        top: '0',
        height: '100%',
        lineHeight: '57px',
        marginLeft: '5px',
      },
      searchBar: {
        textIndent: '30px',
        display: 'inline-block',
        height: '100%',
        left: '0px',
        position: 'absolute',
      },
      actionButton: {
        position: 'absolute',
        marginLeft: '20px',
        marginRight: '20px',
        width: screen.width - 40,
        height: '70px',
        top: actionButtonTop,
      },
    };

    const spinner = this.props.loader || <CircularProgress mode="indeterminate" size={5} />;

    const contacts = this.state.contacts.map((contact, index) => {
      if (contact.name.givenName) {
        return <pmc._contact key={contact.id} contact={contact} filter={this.state.filteredContacts} feedback={this._contactHandler} index={index} />;
      }
    });

    return (
      <div>
        <pmc.appBar icon="arrow_back" action={this.props.cancel} title="IMPORT CLIENTS" />
        <div style={{ 'marginTop': '45px' }}>
          <div className="searchBarContainer" style={{ lineHeight: '60px', 'height': '60px', 'position': 'relative' }}>
            <FontIcon className="material-icons" color="#3a3a3a" style={styles.searchIcon} >search</FontIcon>
            <TextField hintText="Search contacts" className="searchBar"
              hintStyle={{ 'bottom': '0px', 'top': '20px' }}
              onChange={this._filterContacts}
              fullWidth
              style={styles.searchBar}
            />
          </div>
          <div style={styles.contacts}>
            {
              (contacts.length) ? contacts : spinner
            }
          </div>
        </div>
        <pmc.actionButton label="Add TO CLIENT LIST" action={this._handleImportContacts} style={styles.actionButton} />
      </div>
    );
  },
});

Template.pmc_contacts.helpers({
  _action() {
    return this.action;
  },

  cancel() {
    return this.cancel;
  },

  contacts() {
    return pmc.contacts;
  },
});
