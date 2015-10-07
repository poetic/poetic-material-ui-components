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
  _handleActiveDay(e) {

    $('div.day'+this.state.selectedIndex).css({
      'backgroundImage': 'none',
      'color':'#3a3a3a',
      'width':'70px'
    })

    this.state.selectedIndex = parseInt((e.target.className).match(/\d{1,2}/)[0]);

    $('div.day'+this.state.selectedIndex).css({
      'backgroundImage': 'url(../calendar-arrow.png)',
      'backgroundSize': 'contain',
      'backgroundRepeat': 'no-repeat',
      'color':'#fff',
      'width':'80px'
    })
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
      date_selected:{
        'position':'relative',
        'backgroundImage': 'url(../calendar-arrow.png)',
        'backgroundSize': 'contain',
        'backgroundRepeat': 'no-repeat',
        'display':'inline-block',
        'textAlign': 'center',
        'color':'#fff',
        'width':'80px'
      },
      date:{
        'position':'relative',
        'backgroundImage': 'none',
        'display':'inline-block',
        'textAlign': 'center',
        'color':'#3a3a3a',
        'width':'70px'
      },
    }
    let allDays = this.state.days
    let selectedIndex = this.state.selectedIndex
    return(
      <div className='dateSelector' style={styles.parent}>
        {
          _.map(allDays,function(day,index){
            let left = index * 70;
            let month = day.format('MMM')
            let daystring = day.format('dd') + ' ' + day.format('D')
            return <div key={index} className={'day'+index}
              onClick={this._handleActiveDay}
              style={(selectedIndex === index) ? styles.date_selected : {'position':'absolute','backgroundImage': 'none','display':'inline-block','width':'70px','left':left,'textAlign': 'center','color':'#3a3a3a'}}>
              <p className={'day'+index} >{month}</p>
              <p className={'day'+index} >{daystring}</p>
            </div>
            })
        }

      </div>
    )
  }
})
