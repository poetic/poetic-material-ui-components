Package.describe({
  name: 'poetic:material-ui-components',
  version: '0.0.1',
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
    'aldeed:autoform@5.3.1',
    'aldeed:collection2@2.3.3',
    'mdg:camera@1.1.5'
  ], 'client');
  api.imply([
    'poetic:react-material-ui',
    'react'
  ]);

  Cordova.depends({
    'org.apache.cordova.contacts': '0.2.16'
  });

  api.addFiles([
    'before/lib/pmc.js',

    'client/components/action-button/action-button.html',
    'client/components/action-button/action-button.jsx',
    'client/components/app-bar/app-bar.html',
    'client/components/app-bar/app-bar.jsx',
    'client/components/camera-avatar/camera-avatar.html',
    'client/components/camera-avatar/camera-avatar.jsx',
    'client/components/contacts/contacts.html',
    'client/components/contacts/contacts.jsx',
    'client/components/credit-card/credit-card.html',
    'client/components/credit-card/credit-card.jsx',
    'client/components/date-selector/date-selector.jsx',
    'client/components/float-button/float-button.jsx',
    'client/components/sign-in/sign-in.html',
    'client/components/sign-in/sign-in.jsx',


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
    'pmc'
  ], 'client');

});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('poetic:material-ui-components');
  api.addFiles('material-ui-components-tests.js');
});
