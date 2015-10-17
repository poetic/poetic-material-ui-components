const {

} = mui

pmc.dateSelector = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getChildContext() {
    return{
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },
  getInitialState() {
    let dateRange = this.props.range ? this.props.range : 90;
    let days = []

    _(dateRange).times(function(dayNumber){
      let day = moment().add(dayNumber, 'days')
      days.push(day)
    })

    return {
      days: days,
      selectedIndex: 0
    };
  },
  _handleActiveDay(index) {
    this.setState({
      selectedIndex: index
    })

    let {onChange} = this.props
    let date = this.state.days[index]
    onChange(date)
  },
  render() {
    let styles = {
      parent:{
        'height':'70px',
        'width':'100%',
        'borderBottom':'3px solid #e5e5e5',
        'overflowX': 'scroll',
        'WebkitOverflowScrolling': 'touch',
        'overflowY': 'hidden',
        'position':'absolute'
      },
    }
    let allDays = this.state.days
    let selectedIndex = this.state.selectedIndex
    let onChange = this._handleActiveDay
    return(
      <div className='dateSelector' style={styles.parent}>
        {
          _.map(allDays,function(day,index){
            let left = index * 70;
            let month = day.format('MMM')
            let daystring = day.format('dd') + ' ' + day.format('D')
            let className = (index === selectedIndex) ? 'pmcDateSelected' : 'pmcDateNormal'
            return <div key={index} className={className}
              onClick={onChange.bind(this,index)}
              style={{'left':left}}>
              <p className={'day'+index} >{month}</p>
              <p className={'day'+index} >{daystring}</p>
            </div>
            }.bind(this))
        }

      </div>
    )
  }
})
