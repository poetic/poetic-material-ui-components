const {
  Paper,
  FloatingActionButton,
  FontIcon
} = mui


pmc.floatButton = React.createClass({

  getInitialState() {

  let items = this.props.items
  items = items ? items.length : null

    return({
      showDockBtn: true,
      showDockItems: false,
      items: items,
      left: this.props.left,
      icon: (this.props.icon == undefined) ? 'add' : this.props.icon
    })
  },

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getChildContext() {
    return {
      muiTheme: ThemeManager.getCurrentTheme()
    }
  },

  componentWillMount() {
    if(this.state.items > 6){
      throw('Number of menu items cannot be greater than 6!')
    }
  },
  componentDidMount(){
    let dockBtn = this.refs.hideDock.getDOMNode();
    let self = this;

    $(dockBtn).focusout('',function(){
      self.setState({
        showDockItems: false
      })
    })

  },

  _handleDockClick(e) {
    let self = this;
    this.setState({
      showDockItems: !this.state.showDockItems
    })

    this.props.items.map(function(item, index){
      let icon = $(self.getDOMNode())[0].children[0].children[index];
      let top = 0;
      let topPos = self.state.showDockItems ? top : (top + ((index+1)*80));
      $(icon).velocity({
        bottom: topPos,
        opacity: 1,
      },{
        duration: 150,
        'display':'block',
        easing: "easeOutExpo"
      })
    })
  },

  _menuClick(action){
    this._handleDockClick();
    action();
  },

  getStyles({style}) {
    let styles = {};

    let iconStyle = () => {
      return {
      'position':'absolute',
      'bottom':'0px',
      'marginBottom': '8px',
      'fontSize':'39px',
      'color':'#aeaeae',
      }
    };

    let menuItemStyles = () => {
      return {
        'position':'absolute',
        'bottom':'0px',
        'opacity':'0',
        'display':'none'
      };
    };

    let spanStyles = () => {
      return {
        'marginLeft':'20px',
        'marginTop':'15px'
      };
    };

    let right = _.extend(new iconStyle(), style, {right: '20px'});
    let left = _.extend(new iconStyle(), style, {left: '20px'});

    return {
      overlay: {
        'position':'fixed',
        'backgroundColor':'rgba(255,255,255,0.9)',
        'zIndex': '9999',
        'width':'100%',
        'height':'100%',
        'top':'0px',
        'opacity':'1'
      },
      hideOverlay: {
        'zIndex': '999',
        'display':'none',
        'opacity':'0',
        'width':'100%',
        'height':'100vh',
      },
      left: _.extend(new iconStyle(), style, {left: '20px'}),
      leftMenuItems: _.extend(new menuItemStyles(),{left: '28px'}),
      right: _.extend(new iconStyle(), style, {right: '20px'}),
      rightMenuItems: _.extend(new menuItemStyles(),{right: '20px'}),
      spanLeft: _.extend(new spanStyles(),{'float': 'right'}),
      spanRight: _.extend(new spanStyles(),{'float': 'left'}),
    }

  },

  render() {
    let top = screen.height - 175;
    let styles = this.getStyles(this.props);
    let overlay = (this.state.showDockItems) ? styles.overlay : styles.hideOverlay;
    let items = this.props.items
    items = items ? items : []
    return(
      <div>

        {/* Overlay and menu buttons */}
        <Paper refs='overlay' zDepth={3} style={overlay} >
          {
            items.map(function(item, index){
              let icon = <FontIcon className="material-icons">{item.icon}</FontIcon>;
              if(item.customIcon){
                icon = <img className='customIcon' src={item.customURL} />;
              }
              return <div key={index} style={(this.state.left == undefined) ? styles.rightMenuItems : styles.leftMenuItems}>
                <span style={(this.state.left == undefined) ? styles.spanRight : styles.spanLeft}>{item.label}</span>
                <FloatingActionButton
                  linkButton={true}
                  onClick={this._menuClick.bind(this, item.action)}
                  >
                  {icon}
              </FloatingActionButton></div>
              }.bind(this))
          }

          <FontIcon
            onClick={this._handleDockClick}
            ref='hideDock'
            style={(this.state.left === undefined) ? styles.right : styles.left }
            className="material-icons hideDock">cancel</FontIcon>
        </Paper>
        {/**** End Overlay ***/}

        {/* Dock button stuffs below */}
        <FloatingActionButton backgroundColor={"#c0f948"} className='dock'
          style={(this.state.left == undefined) ? styles.right : styles.left }
          onClick={this._handleDockClick}>
          <FontIcon className="material-icons">{this.state.icon}</FontIcon>
        </FloatingActionButton>
      </div>
    )
  }
})
