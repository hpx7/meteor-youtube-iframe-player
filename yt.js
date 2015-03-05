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

var iframeApiReady = new ReactiveVar(false);

window.onYouTubeIframeAPIReady = function () {
  iframeApiReady.set(true);
};

Meteor.startup(function () {
  $.getScript('//www.youtube.com/iframe_api');
});

YTPlayer = function (name, playerVars) {
  if (arguments.length === 1) {
    playerVars = name;
    name = 'ytplayer';
  }

  var self = this;
  var playerReady = new ReactiveVar(false);
  var playerTemplate = getTemplate(name);

  playerTemplate.rendered = function () {
    this.autorun(function () {
      if (iframeApiReady.get()) {
        self.player = new YT.Player(name, {
          events: {
            'onReady': function () {
              playerReady.set(true);
            }
          },
          playerVars: playerVars || {}
        });
      }
    });
  };

  playerTemplate.destroyed = function () {
    playerReady.set(false);
  };

  self.ready = function () {
    return playerReady.get();
  };
};
