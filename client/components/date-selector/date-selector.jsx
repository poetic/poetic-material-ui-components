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
    return {
    date_zero: new Date(),
    date_89: [],
    selectedIndex: null
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
  componentWillMount() {
  	let times = 89;
  	let index =1;
  	let day_zero = {};
  	day_zero.date = this.state.date_zero;

  	this.state.selectedIndex = 0;

  	this.state.date_89.push(day_zero)

  	while(times>0)
  	{
  		let day = {};
  		let newdate = new Date(this.state.date_zero.getYear(),this.state.date_zero.getMonth(),this.state.date_zero.getDate()+index);
  		day.date = newdate;
  		this.state.date_89.push(day)
  		++index;
  		--times;
  	}
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

  	return(
  		<div className='dateSelector' style={styles.parent}>
  		{
  			this.state.date_89.map(function(day,index){
  				let left = index * 70;
  				let dateString = day.date.toDateString();
  				let month = dateString.substr(4,4);
  				let daystring = dateString[0] +' '+ dateString.substr(8,2);
  				return <div key={index} className={'day'+index} onClick={this._handleActiveDay} style={(this.state.selectedIndex == index) ? styles.date_selected : {'position':'absolute','backgroundImage': 'none','display':'inline-block','width':'70px','left':left,'textAlign': 'center','color':'#3a3a3a'}}>
		    				<p className={'day'+index} >{month}</p>
		    				<p className={'day'+index} >{daystring}</p>
	    				</div>
  			}.bind(this))
  		}
  			
  		</div>
		)
  }
})