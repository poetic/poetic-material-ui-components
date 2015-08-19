Package.describe({
  name: 'poetic:material-ui-components',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
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
        'aldeed:collection2@2.3.3'
    ], 'client');
    api.imply([
      'poetic:react-material-ui',
      'react'
      ]);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('poetic:material-ui-components');
  api.addFiles('material-ui-components-tests.js');
});
