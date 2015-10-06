const
{
  TextField,
  RaisedButton,
  FlatButton
} = mui;

pmc.creditCard = React.createClass({
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },
  getInitialState() {
    return {
      cardLogo: ''
    };
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

      let exp = this.refs.exp.getValue()
      let num = this.refs.cardNumber.getValue()
      let zip = this.refs.zip.getValue()
      let cvc = this.refs.cvc.getValue()

      if(exp && num && zip && cvc){

        exp = exp.replace(/\D/g, '').match(/(\d{2})(\d{2})/);
        card.exp.month = exp[1];
        card.exp.year = exp[2];
        card.num = num.replace(/\D/g, '');
        card.zip = zip;
        card.cvc = cvc;

        this.props.action(card);
      }else{
        //Send null to invalidate any previous state
        this.props.action(null);
      }
  },

  _handleCardNumber(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})/);

    let visa = /^4[0-9]{2,}/.test(x[1]);
    let masterCard = /^5[1-5][0-9]{1,}/.test(x[1]);
    let americanExpress = /^3[47][0-9]{1,}/.test(x[1]);

    if(x[1].length==0)
      {
        this.setState({
          cardLogo: ''
        })
      }

      if(visa)
        {
          this.setState({
            cardLogo: 'cardLogo pmcVisa'
          })
        }
        if(masterCard)
          {
            this.setState({
              cardLogo: 'cardLogo pmcMasterCard'
            })
          }
          if(americanExpress)
            {
              this.setState({
                cardLogo: 'cardLogo pmcAmericanExpress'
              })
            }
            e.target.value = !x[2] ? x[1] : x[1] + ' ' + x[2] + (x[3] ? ' ' + x[3] : '') + (x[4] ? ' ' + x[4] : '');

            if(visa || masterCard || americanExpress){
               this._handleCardSubmit()
            }
  },
  _handleExp(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,2})/);
    e.target.value = !x[2] ? x[1] : x[1] +'/'+ x[2];

    this._handleCardSubmit()
  },
  _handleCvc(e) {
    let x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})/);
    e.target.value = x[1];

    this._handleCardSubmit()
  },
  render() {
    let width = screen.width - 40;

    let userStyle = this.props.style || {}
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
        'height':'40px',
        'display': 'inline-block',
        'borderRight': '1px solid #e4e4e4',
        'borderLeft': '1px solid #e4e4e4',
        'borderRadius':'0px'

      },
      cvc:{
        'width':'30%',
        'display': 'inline-block'
      },
      cc:_.extend({
        'width': width,
        'position':'relative',
        'height':'90px',
        'borderLeft': '1px solid #e4e4e4',
        'borderRight': '1px solid #e4e4e4',
        'borderTop': '1px solid #e4e4e4',
'borderRadius':'4px'
      },this.props.style),
    }
    return(
      <div className='pmcCreditCard'>
        <div style={styles.cc} >
          <div className={this.state.cardLogo} />
          <TextField
            hintText="Card Number" fullWidth={true} style={styles.card}
            ref="cardNumber" onChange={this._handleCardNumber} />
          <div style={styles.exp} >
            <TextField  ref='exp' hintText='MM/YY' fullWidth={true} onChange={this._handleExp} />
          </div>
          <div style={styles.zip}>
            <TextField ref="cvc" type='number' hintText='CVC' onChange={this._handleCvc} fullWidth={true}  />
          </div>
          <div style={styles.cvc}>
            <TextField ref='zip'
              fullWidth={true} hintText='ZIP CODE' onChange={this._handleCardSubmit}/>
          </div>
        </div>
      </div>
    );

  }
})
Template.pmc_creditCard.helpers({
  creditCard() {
    return pmc.creditCard;
  },
  _action() {
    return this.action;
  }
})
