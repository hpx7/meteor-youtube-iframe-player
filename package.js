Package.describe({
  name: 'hpx7:youtube-iframe-player',
  summary: 'Control YouTube\'s embedded player using Meteor',
  version: '0.1.3',
  git: 'https://github.com/hpx7/meteor-youtube-iframe-player.git'
});

Package.onUse(function (api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use(['underscore', 'jquery', 'reactive-var'], 'client');
  api.addFiles('yt.js', 'client');
  api.export('YTPlayer', 'client');
});
