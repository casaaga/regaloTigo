    var player,
        seeking = false,
        updater,
        time;


    function getvideoheight(width) {
      return 9/16*width;
    }
    function resizebonoRegalos() {
      var bonoRegalos = document.getElementsByClassName("bonoRegalo");
      for(var   i   =0,
                il  = bonoRegalos.length;i<il;i++){
        bonoRegalowidth = bonoRegalos[i].offsetWidth;
        bonoRegaloheight = getvideoheight(bonoRegalowidth);
        bonoRegalos[i].style.height = bonoRegaloheight+'px';
      }
    }
    function getVolume() {
      return player.getVolume();
    }
    function changeVolume(value) {
      player.setVolume(value);
      changevolumecolor();
    }
    function roundNumber(number, decimalPlaces) {
      decimalPlaces = (!decimalPlaces ? 2 : decimalPlaces);
      return Math.round(number * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
    }

    function getDuration() {
      return player.getDuration();
    }

    function setDuration() {
      document.getElementById('track').max = getDuration() - 1;
    }

    function getCurrentTime() {
      var currentTime = player.getCurrentTime();
      return roundNumber(currentTime, 3);
    }

    function playerReady() {
      setDuration();
      document.getElementById('track').value = getCurrentTime();
      updateCurrentTime();
      updateTime();
      changeVolume(getVolume());
      document.getElementById('volume').value = getVolume();
      resizebonoRegalos();
      changevolumecolor();
    }

    function seekTo(seconds) {
      return player.seekTo(seconds, true);
    }

    function updateCurrentTime() {
      if (!seeking) {
        document.getElementById('track').value = getCurrentTime();
        changetrackcolor();
      }
    }
    function updateTime() {
      if (!seeking) {
        document.getElementById('time').innerHTML = secondsToString(Math.round(player.getCurrentTime()));
      }
    }
    function updateData(state) {
      if (state == 1) {
        updater = setInterval(function () {
          updateCurrentTime()
        }, 300);
        time = setInterval(function () {
          updateTime()
        }, 1000);
        updateTime();
      } else if (state == 2) {
        clearInterval(updater);
        clearInterval(time);
      }
    }
    function videostatus(state) {
      state = state["data"];
      updateData(state);
      updatePlay();
    }
    function updatePlay() {
      switch(player.getPlayerState()) {
      case -1: // No status
        document.getElementById('toggleplay').innerHTML = 'Play';
        break;
      case 0: // Finished
        document.getElementById('toggleplay').innerHTML = 'll';
        break;
      case 1: // Playing
        document.getElementById('toggleplay').innerHTML = 'll';
        break;
      case 2: // Paused
        document.getElementById('toggleplay').innerHTML = 'Play';
        break;
      }
    }
    function secondsToString(seconds) {
      var numminutes = Math.floor((((seconds % 31536000) % 86400) % 3600) / 60);
      var numseconds = (((seconds % 31536000) % 86400) % 3600) % 60;
      return ('0'+numminutes).slice(-2) +  ":"  + ('0'+numseconds).slice(-2);
    }
    function changetrackcolor() {
        var val = ($("#track").val() - $("#track").attr('min')) / ($("#track").attr('max') - $("#track").attr('min'));
        console.log(val);
        $("#track").css('background-image',
          '-webkit-gradient(linear, left top, right top, ' +
            'color-stop(' + val + ', #c0392b), ' +
            'color-stop(' + val + ', #cecece)' +
            ')'
        );
    }
    function changevolumecolor() {
        var val = ($("#volume").val() - $("#volume").attr('min')) / ($("#volume").attr('max') - $("#volume").attr('min'));
        $("#volume").css('background-image',
          '-webkit-gradient(linear, left top, right top, ' +
            'color-stop(' + val + ', #7f8c8d), ' +
            'color-stop(' + val + ', #cecece)' +
            ')'
        );
    }
    function togglePlay() {
      switch(player.getPlayerState()) {
      case -1: // No status
        player.playVideo();
        document.getElementById('toggleplay').innerHTML = 'll';
        break;
      case 0: // Finished
        player.playVideo();
        document.getElementById('toggleplay').innerHTML = 'Play';
        break;
      case 1: // Playing
        player.pauseVideo();
        document.getElementById('toggleplay').innerHTML = 'Play';
        break;
      case 2: // Paused
        player.playVideo();
        document.getElementById('toggleplay').innerHTML = 'll';
        break;
      }
    }

    function onYouTubePlayerAPIReady() {
      player = new YT.Player('player', {
        width: '100%',
        height: '500px',
        videoId: 's7mh9Dl6dVI',
        playerVars: {
          controls: 0,
          showinfo: 0,
          iv_load_policy: 3,
          cc_load_policy: 0,
          rel: 0
        },
        events: {
          'onStateChange': videostatus,
          'onReady': playerReady
        }
      });

      document.getElementById('toggleplay').onclick = function () {
        togglePlay();
      };
      document.getElementById('track').onmousedown = function () {
        seeking = true;
      }
      document.getElementById('track').onmouseup = function () {
        seekTo(this.value);
        seeking = false;
      }
      document.getElementById('volume').onchange = function() {
        changeVolume(this.value);
      }
    }
    window.onresize = function(event) {
      resizebonoRegalos();
    }