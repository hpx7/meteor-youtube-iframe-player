meteor-youtube-iframe-player
============================

Control YouTube's embedded player using Meteor

## Install

Install using Meteor:

```sh
$ meteor add hpx7:youtube-iframe-player
```

## Usage

The arguements required to initialize the player are the player's DOM id, the video template, and any playerVars for the iframe player.

Given a template like the following
```javascript
<template name="video">
  <div class="video-container">
    <div id="player"></div>
  </div>
</template>
```
initialize the player like this
```javascript
var yt = new YTPlayer('player', Template.video, {rel: 0, playsinline: 1});
```
The `yt` object contains a reactive `ready` function and exposes the underlying youtube `player` object.

## Examples

To play a song:
```javascript
Tracker.autorun(function () {
  var yt_id = ... // the video id for a youtube video
  if (yt.ready()) yt.player.loadVideoById(yt_id);
});
```

To add an event listener:
```javascript
Tracker.autorun(function () {
  if (yt.ready()) {
    yt.player.addEventListener('onStateChange', function (e) {
      if (e.data === YT.PlayerState.ENDED) {
        // handle the event
      }
    });
  }
});
```
