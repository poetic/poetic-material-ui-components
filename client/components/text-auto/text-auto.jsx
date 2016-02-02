const { TextField } = mui;

function registerEvent(el, event) {
  $(el).on(event, function updateSuggestion(e, suggestion) {
    this.updateActiveState(suggestion);
  }.bind(this));
}

pmc.textAuto = React.createClass({

  propTypes: {
    dataSelect: React.PropTypes.object,
    label: React.PropTypes.string,
    hintText: React.PropTypes.string,
    defaultValue: React.PropTypes.string,
    dataSource: React.PropTypes.array,
    disableFloat: React.PropTypes.bool,
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    return { activeObject: null };
  },

  getChildContext() {
    return { muiTheme: ThemeManager.getCurrentTheme() };
  },

  componentDidMount() {
    Meteor.typeahead.inject();
    const typeaheadContainer = this.refs.typeaheadContainer.getDOMNode();
    const typeaheadInput = $(typeaheadContainer).find('input')[0];

    ['typeahead:select', 'typeahead:autocomplete', 'typeahead:cursorchange'].forEach((event) => {
      registerEvent.call(this, typeaheadInput, event);
    });

    Meteor.typeahead(typeaheadInput, this.typeaheadSource);
  },

  getValue() {
    return this.state.activeObject;
  },

  getFloatingFromDefault() {
    const { label, hintText, defaultValue } = this.props;

    if (defaultValue) {
      return (
        <TextField
          floatingLabelText={label}
          defaultValue={defaultValue}
          hintText={hintText}
          ref="typeaheadContainer"
        />
      );
    }
    return (
      <TextField
        floatingLabelText={label}
        hintText={hintText}
        ref="typeaheadContainer"
      />
    );
  },

  getWithoutFloat() {
    const { hintText, defaultValue } = this.props;

    if (defaultValue) {
      return (
        <TextField
          defaultValue={defaultValue}
          hintText={hintText}
          ref="typeaheadContainer"
        />
      );
    }
    return (
      <TextField
        hintText={hintText}
        ref="typeaheadContainer"
      />
    );
  },

  setValue(value) {
    this.refs.typeaheadContainer.setValue(value);
  },

  clear() {
    this.refs.typeaheadContainer.clearValue();
  },

  typeaheadSource(query, syncTypeahead/* ,  asyncTypeahead */) {
    const dataSource = this.props.dataSource;
    const result = [];

    _.each(dataSource, (dataItem) => {
      const suggestion = dataItem.suggestion.toLowerCase();
      let matchesQuery = suggestion.indexOf(query.toLowerCase());
      matchesQuery = matchesQuery !== -1;

      if (query.toLowerCase() === suggestion) {
        console.log('setting', { value: dataItem.suggestion, obj: dataItem });
        this.setState({ activeObject: { suggestion: { value: dataItem.suggestion, obj: dataItem } } });
      }

      if (matchesQuery) {
        result.push({ value: dataItem.suggestion, obj: dataItem });
      }
    });
    syncTypeahead(result);
  },

  updateActiveState(suggestion, dataset) {
    console.log('the suggestion object', suggestion);
    this.setState({ activeObject: { suggestion } });

    if (this.props.dataSelect) {
      self.props.dataSelect(undefined, suggestion, dataset);
    }
  },

  generateTextField() {
    const { disableFloat } = this.props;
    if (!disableFloat) {
      return this.getFloatingFromDefault();
    }
    return this.getWithoutFloat();
  },

  render() {
    return this.generateTextField();
  },
});
