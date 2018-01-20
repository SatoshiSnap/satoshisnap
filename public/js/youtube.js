// 2. This code loads the IFrame Player API code asynchronously.
// var tag = document.createElement('script');

// tag.src = "https://www.youtube.com/iframe_api";
// var firstScriptTag = document.getElementsByTagName('script')[0];
// firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var tag = document.createElement('script');
  tag.id = 'iframe-demo';
  tag.src = 'https://www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    // height: '390',
    // width: '640',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  document.getElementById('player').style.borderColor = '#FF6D00';
  // let player = event.target;

  // player.loadPlaylist('PLAlosoTOSU3zHRLG67G8h6BAVxp62Y6Za', 0, 'hd720');
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;

function onPlayerStateChange(event) {

  if (event.data == YT.PlayerState.PLAYING) {
    document.getElementById('startButton').style.zIndex = '-1';
  } else if (event.data == YT.PlayerState.PAUSED) {
    document.getElementById('startButton').style.zIndex = '1000';
  }
}

function playVideo() {
 player.playVideo();
}

function stopVideo() {
  player.stopVideo();
}
