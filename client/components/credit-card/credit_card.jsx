const
{	
	TextField,
	RaisedButton,
	FlatButton
} = mui;

pmc.creditCardComponent = React.createClass({
 childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    };
  },
  _handleCardSubmit(e) {
  	let card = {
  		exp:{

  		}
  	};
  	let exp = this.refs.exp.getValue().replace(/\D/g, '').match(/(\d{2})(\d{2})/)
  	card.num = this.refs.cardNumber.getValue().replace(/\D/g, '');
  	card.exp.month = exp[1];
  	card.exp.year = exp[2];
  	card.zip = this.refs.zip.getValue();
  	card.cvc = this.refs.cvc.getValue();
  	card.set = true;
  	this.props.action(card);
	// STRIPE.getToken( '#application-signup', {
	// 	  number: $('[data-stripe="cardNumber"]').val(),
	// 	  exp_month: $('[data-stripe="exp-month"]').val(),
	// 	  exp_year: $('[data-stripe="exp-year"]').val(),
	// 	  cvc: $('[data-stripe="cvc"]').val()
	// 	}, 
	// 	function(err,res) {
	// 	  Router.go("/trainer/home");
	//   	}
 //    );
  },
  componentWillReceiveProps: function(nextProps) {
  if(nextProps.compute=='active'){
  	let card = {
  		exp:{

  		}
  	};
  	let exp = this.refs.exp.getValue().replace(/\D/g, '').match(/(\d{2})(\d{2})/)
  	card.num = this.refs.cardNumber.getValue().replace(/\D/g, '');
  	card.exp.month = exp[1];
  	card.exp.year = exp[2];
  	card.zip = this.refs.zip.getValue();
  	card.cvc = this.refs.cvc.getValue();
  	nextProps.action(card);
  }
},
  _handleCard(e) {
  	let x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);
  	e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');
  },
  _handleExp(e) {
  	let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
  	e.target.value = !x[2] ? x[1] : x[1] +'/'+ x[2];
  },
  _handleCvc(e) {
  	let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})/);
  	e.target.value = x[1];
  },
 render() {
 	let styles = {
 		card:{
		    'textIndent': '51px'
 		} ,
 		exp:{
 			'width':'30%',
 			'display': 'inline-block'
 		},
 		zip:{
 			'width':'40%',
      'height':'60px',
 			'display': 'inline-block',
      'borderRight': '1px solid #e4e4e4',
      'borderLeft': '1px solid #e4e4e4',
			'borderRadius':'0px'

 		},
 		cvc:{
 			'width':'30%',
 			'display': 'inline-block'
 		},
 		cc:{
 			'width': '280px',
      'height':'108px',
      'borderLeft': '1px solid #e4e4e4',
      'borderRight': '1px solid #e4e4e4',
      'borderTop': '1px solid #e4e4e4',

 		}
 	}

 	return(
 		<div>
	 		<div className='zero' style={styles.cc} >
	 			<div className='row'>
	 				<div className='col-xs-12'>
		 				<TextField
	        			hintText="Card Number" fullWidth={true} style={styles.card}
	        			ref="cardNumber" onChange={this._handleCard} />
        			</div>
	 			</div> 
	 			<div className='row'>
	 				<div className='col-xs-12'>
		 				<div style={styles.exp} >
		 					<span>EXP </span>
		 					<TextField  ref='exp' fullWidth={true} onChange={this._handleExp} />
	 					 </div>
	 					 <div style={styles.zip}>
		 					 <span>ZIP </span>
		 					 <TextField ref='zip' fullWidth={true} onChange={this._handleZip} />
	 					  </div>
	 					<div style={styles.cvc}>  
        				<span>CVC </span>
	        				<TextField
	        				ref="cvc" type='number' fullWidth={true} onChange={this._handleCvc}/>
        				</div>
	 				</div>
	 
	 			</div>
	 		</div>

 		</div>
 		);

 }
})
Template['creditCard'].helpers({
	creditCardComponent() {

		return pmc.creditCardComponent;
	}
})