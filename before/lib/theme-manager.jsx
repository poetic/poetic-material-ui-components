pmc._setDefaultTheme = function(){ 
  ThemeManager.setComponentThemes({
    raisedButton: {
      height: 70,
      minWidth: screen.width - 40,
    },
  })
}

pmc._setDefaultPalette = function () {
  ThemeManager.setPalette({
    primary1Color: '#c0f948',
    primary2Color: '#2a2a2a',
    primary3Color: '#aeaeae',
    accent1Color: '#c0f948',
    disabledColor: '#aeaeae'
  })
}

pmc.setTheme = function(theme) {
  ThemeManager.setComponentThemes(theme);
}

pmc.setPalette = function(palette) {
  ThemeManager.setPalette(palette)
}