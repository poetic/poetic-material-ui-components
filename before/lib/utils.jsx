pmc.showDialog = function(obj) {
  $('body').prepend("<div id='pmc_dialog'> </div>");
  let dialog = React.createElement(pmc._dialog,obj);
  React.render(dialog,document.getElementById('pmc_dialog'))
}


pmc.hideSpinner = function() {
  React.unmountComponentAtNode(document.getElementById('spinner'),pmc.spinner)
}

pmc.simpleDialog = function(obj) {
  $('body').prepend("<div id='pmc_sdialog'> </div>");
  let dialog = React.createElement(pmc._sdialog,obj);
  React.render(dialog,document.getElementById('pmc_sdialog'))
}
