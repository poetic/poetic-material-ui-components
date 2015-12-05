Package.describe({
  name: 'poetic:material-ui-components',
  version: '0.0.6',
  // Brief, one-line summary of the package.
  summary: 'A collection of helpful components using the material ui framework',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');

  api.use([
    'react@0.1.7',
    'react-template-helper@0.1.2',
    'poetic:react-material-ui@0.0.2',
    'templating@1.1.1',
    'underscore@1.0.3',
    'fortawesome:fontawesome@4.4.0',
    'aldeed:autoform@5.3.1',
    'aldeed:collection2@2.3.3',
    'momentjs:moment@2.8.4',
    'sewdn:masked-input',
    'sergeyt:typeahead@0.11.1_4',
  ], 'client');
  api.imply([
    'poetic:react-material-ui',
    'react',
    'sewdn:masked-input',
  ]);

  Cordova.depends({
    'org.apache.cordova.contacts': '0.2.16'
  });

  api.addFiles([
    'before/lib/pmc.js',
    'before/lib/utils.jsx',
    'client/lib/theme-manager.jsx',

    'client/components/action-button/action-button.html',
    'client/components/action-button/action-button.jsx',
    'client/components/app-bar/app-bar.html',
    'client/components/app-bar/app-bar.jsx',
    'client/components/camera-avatar/camera-avatar.html',
    'client/components/camera-avatar/camera-avatar.jsx',
    'client/components/contact/contact.html',
    'client/components/contact/contact.jsx',
    'client/components/contacts/contacts.html',
    'client/components/contacts/contacts.jsx',
    'client/components/dialog/dialog.jsx',
    'client/components/credit-card/credit-card.html',
    'client/components/credit-card/credit-card.jsx',
    'client/components/date-selector/date-selector.jsx',
    'client/components/float-button/float-button.jsx',
    'client/components/phone-input/phone-input.html',
    'client/components/phone-input/phone-input.jsx',
    'client/components/sign-in/sign-in.html',
    'client/components/sign-in/sign-in.jsx',
    'client/components/simple-dialog/simple-dialog.jsx',
    'client/components/spinner/spinner.html',
    'client/components/spinner/spinner.jsx',
    'client/components/text-auto/text-auto.jsx',


    'public/material-icons/MaterialIcons-Regular.eot',
    'public/material-icons/MaterialIcons-Regular.ttf',
    'public/material-icons/MaterialIcons-Regular.woff',
    'public/material-icons/MaterialIcons-Regular.woff2',

    'public/cards/amex.png',
    'public/cards/mastercard.png',
    'public/cards/visa.png',


    'client/pmc.css',
  ],'client');


  api.export([
    'pmc',
  ], 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('poetic:material-ui-components');
  api.addFiles('material-ui-components-tests.js');
});
