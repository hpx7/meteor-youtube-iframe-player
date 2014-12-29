var downloadIFrameAPI = _.once(function () {
  $.getScript('//www.youtube.com/iframe_api');
});

YTPlayer = function (playerId, videoTemplate, playerVars) {
  var self = this;
  var ready = new ReactiveVar(false);

  window.onYouTubeIframeAPIReady = function () {
    self.player = new YT.Player(playerId, {
      events: {
        'onReady': function () {
          ready.set(true);
        }
      },
      playerVars: playerVars || {}
    });
    videoTemplate.rendered = onYouTubeIframeAPIReady;
  };

  videoTemplate.created = function () {
    downloadIFrameAPI();
  };

  videoTemplate.destroyed = function () {
    ready.set(false);
  };

  this.ready = function () {
    return ready.get();
  };
};
