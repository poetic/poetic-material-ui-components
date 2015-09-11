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
    let exp = this.refs.exp.getValue().replace(/\D/g, '').match(/(\d{2})(\d{2})/)
    card.num = this.refs.cardNumber.getValue().replace(/\D/g, '');
    card.exp.month = exp[1];
    card.exp.year = exp[2];
    card.zip = this.refs.zip.getValue();
    card.cvc = this.refs.cvc.getValue();
    card.set = true;
    this.props.action(card);
  },

  componentWillReceiveProps: function(nextProps) {
    if(nextProps.compute=='active'){
      let card = {
        exp:{

        }
      };
      let exp = this.refs.exp.getValue().replace(/\D/g, '').match(/(\d{2})(\d{2})/);
      card.num = this.refs.cardNumber.getValue().replace(/\D/g, '');
      card.exp.month = exp[1];
      card.exp.year = exp[2];
      card.zip = this.refs.zip.getValue();
      card.cvc = this.refs.cvc.getValue();
      nextProps.action(card);
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
    let width = screen.width - 40;

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
      cc:_.extend({
        'width': width,
        'height':'108px',
        'borderLeft': '1px solid #e4e4e4',
        'borderRight': '1px solid #e4e4e4',
        'borderTop': '1px solid #e4e4e4',

      },this.props.style.card),
      button:_.extend({
        'marginLeft':'20px',
        'marginRight':'20px',
        'width': width,
        'height':'70px',
        'position':'absolute',
        'left': '0px'
      },this.props.style.button)
    }
    return(
      <div>
        <div style={styles.cc} >
          <div className={this.state.cardLogo} />
          <TextField
            hintText="Card Number" fullWidth={true} style={styles.card}
            ref="cardNumber" onChange={this._handleCardNumber} />
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
        <pmc.actionButton
          label='SAVE CARD'
          action={this._handleCardSubmit} style={styles.button} />
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
