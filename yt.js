var downloadIFrameAPI = _.once(function () {
  Meteor.startup(function() {
    $.getScript('//www.youtube.com/iframe_api');
  });
});

YTPlayer = function (playerId, videoTemplate, playerVars) {
  var self = this;
  var ready = new ReactiveVar(false);

  onYouTubeIframeAPIReady = function () {
    self.player = new YT.Player(playerId, {
      events: {
        'onReady': function () {
          ready.set(true);
        }
      },
      playerVars: playerVars || {}
    });
    videoTemplate.rendered = onYouTubeIframeAPIReady;
  }

  videoTemplate.destroyed = function () {
    ready.set(false);
  };

  this.ready = function () {
    return ready.get();
  };

  downloadIFrameAPI();
};
