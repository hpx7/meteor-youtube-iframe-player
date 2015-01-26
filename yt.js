YTPlayer = function (playerId, playerTemplate, playerVars) {
  var self = this;
  var ready = new ReactiveVar(false);

  playerTemplate.rendered = function () {
    self.player = new window.YT.Player(playerId, {
      events: {
        'onReady': function () {
          ready.set(true);
        }
      },
      playerVars: playerVars || {}
    });
  };

  playerTemplate.destroyed = function () {
    ready.set(false);
  };

  this.ready = function () {
    return ready.get();
  };
};
