meteor-youtube-iframe-player
============================

Control YouTube's embedded player using Meteor

## Install

Install using Meteor:

```sh
$ meteor add hpx7:youtube-iframe-player
```

## Usage

```javascript
new YTPlayer([name], playerVars)
```
`name` is optional and allows you to distinguish between multiple players (`ytplayer` by default).
`playerVars` are options passed to [YouTube's iFrame API](https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player).

Now just include `{{> YTPlayer name="<my_player_name>"}}` in your template where you'd like the player to be rendered. The name parameter is optional and defaults to `ytplayer`

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
