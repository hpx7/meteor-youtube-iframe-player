var getTemplate = (function () {
  var templates = {};
  return function (name) {
    if (!templates[name])
      templates[name] = Template.fromString('<div id="' + name + '"></div>');
    return templates[name];
  };
})();

Template.registerHelper('YTPlayer', function () {
  return getTemplate(this.name || 'ytplayer');
});

Meteor.startup(function () {
  $.getScript('//www.youtube.com/iframe_api');
});

YTPlayer = function (name, playerVars) {
  if (arguments.length === 1) {
    playerVars = name;
    name = 'ytplayer';
  }

  var self = this;
  var ready = new ReactiveVar(false);
  var playerTemplate = getTemplate(name);

  function initPlayer () {
    self.player = new YT.Player(name, {
      events: {
        'onReady': function () {
          ready.set(true);
        }
      },
      playerVars: playerVars || {}
    });
  }

  window.onYouTubeIframeAPIReady = function () {
    initPlayer();
    playerTemplate.rendered = initPlayer;
  };

  playerTemplate.destroyed = function () {
    ready.set(false);
  };

  self.ready = function () {
    return ready.get();
  };
};
