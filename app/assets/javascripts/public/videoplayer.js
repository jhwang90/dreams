var clientId = '974537623396-tvvr2jn442jsf1ifr4qblfhaje5cd0i2.apps.googleusercontent.com';
var apiKey = 'AIzaSyBHlHFpUocBCj-VbXZXy5BKaIkvXh2jpgI';
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
}

VideoPlayer = {
  main: function(videos) {

    VideoMaker = function(userVideos) {
      this.playList = [];
      this.cueList = [];
      this.playList = userVideos.shift()
      this.cueList = this.cueList.concat(userVideos)
    }

    var userList1 = new VideoMaker(videos)

    function onPlayerReady(event) {
      event.target.playVideo();
    }

    var done = false;
    function onPlayerStateChange(event) {
      console.log('onPlayerStateChange', event)

      var past_first = false;
      if (event.data == YT.PlayerState.PLAYING && !past_first) {
        past_first = true;
        $('#player').fadeIn(2000)
        setTimeout(function() {$('#player').fadeOut(2000)}, 6000)
      } else if (event.data == YT.PlayerState.PLAYING) {
        setTimeout(function() {$('#player').fadeIn(2000)}, 10000)
        setInterval( function() {if (player.getCurrentTime() > 8) {
        $('#player').fadeOut(2000)
        };}, 1000)
      };
      if ((event.data === 0) && (userList1.cueList.length === 0)) {
        console.log("this shit is over");
        dreamHasEnded();
      }
    }


    function onPlayerError(event) {
      console.log(event);
    }

    function stopVideo() {
      player.stopVideo();
    }

    function dreamPlaylist(videoarray) {
      videoarray.shift()
      console.log("printing videoarray.length after shift: ");
      console.log(videoarray.length);
      videoTimer(videoarray)
    }

    function playTheVideo(video) {
      player.loadVideoById({
        'videoId': video,
        'startSeconds': 2,
        'endSeconds': 12,
        'suggestedQuality': 'large'});

      dreamPlaylist(userList1.cueList);
    }

    function videoList(videoId) {
      playTheVideo(videoId);
      player.playVideo();
    }

    function videoTimer(array) {
      if(array.length > 0) {
        setTimeout(function() { videoList(array[0])}, 10000);
      }
      else {
        console.log("videoTimer says video array is empty");
      }
    }

    player = new YT.Player('player', {
      height: '576',
      width: '1024',
      'videoId': userList1.playList,
      playerVars: {
        controls: 0,
        disablekb: 1,
        showinfo: 0,
        wmode: "opaque"
      },
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerError
      },
    });

    dreamPlaylist(userList1.cueList)
  }
}

