pmc.dateSelector = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object,
  },

  getInitialState() {
    let selectedIndex = 0;
    const dateWidth = 70;
    const dateRange = this.props.range ? this.props.range : 90;
    const historyRange = this.props.historyRange ? this.props.historyRange : 0;
    const days = [];

    _(dateRange).times(dayNumber => {
      const day = moment().add(dayNumber, 'days');
      days.push(day);
    });

    _(historyRange).times(daysPast => {
      const day = moment().subtract(daysPast + 1, 'days');
      days.splice(0, 0, day);
      selectedIndex++;
    });

    return {
      days,
      selectedIndex,
      dateWidth,
      goToInitialDateStyle: {},
    };
  },

  componentDidMount() {
    const { selectedIndex, dateWidth } = this.state;
    const { container } = this.refs;
    $(container.getDOMNode()).scrollLeft(selectedIndex * dateWidth);
  },

  _handleActiveDay(index) {
    this.setState({
      selectedIndex: index,
    });

    const { onChange } = this.props;
    const date = this.state.days[index];
    onChange(date);
  },
  render() {
    const styles = {
      parent: {
        height: '70px',
        width: '100%',
        borderBottom: '3px solid #e5e5e5',
        overflowX: 'scroll',
        WebkitOverflowScrolling: 'touch',
        overflowY: 'hidden',
        position: 'absolute',
      },
    };
    const {
      days: allDays,
      selectedIndex,
      dateWidth,
      goToInitialDateStyle,
    } = this.state;
    const onChange = this._handleActiveDay;
    return (
      <div
        className="dateSelector"
        ref="container"
        style={ styles.parent }
      >
        {
          _.map(allDays, (day, index) => {
            const left = index * dateWidth;
            const month = day.format('MMM');
            let daystring = day.format('dd').substring(0, 1);
            daystring += day.format('D') < 10 ? ' 0' : ' ';
            daystring += day.format('D');
            const className = (index === selectedIndex) ? 'pmcDateSelected' : 'pmcDateNormal'

            return (
              <div key={index} className={ className }
                onClick={ () => { onChange(index) }}
                style={{ left}} >
                <p className={'date-selector-month day'+index} >{month}</p>
                <p className={'date-selector-date day'+index} >{daystring}</p>
              </div>
              )
          })
        }
      </div>
    );
  },
});
