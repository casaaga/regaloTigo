  /* :::::::: VIDEO ESTADOS ::::::::

    -1 – unstarted
    0 – ended
    1 – playing
    2 – paused
    3 – buffering
    5 – video cued
 ::::::::::::::::::::::::::::::::

  */

  var player;
  var videoState
  var node = "player";
 var timeupdater
var videotime;





  // Append the YouTube IFRAME API Script
  var youtube = document.createElement('script');
  youtube.type = "text/javascript";
  youtube.src = "//www.youtube.com/iframe_api";

  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(youtube, s);



  // Prepare the YouTube Player
  // We set rel=0 and showinfo=1 to hide related videos & info bar


  function onYouTubePlayerAPIReady() {
    player = new YT.Player(node, {
        width: '100%',
        height: '570px',
      playerVars: {
          controls: 1,
          showinfo: 0,
          autohide: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          rel: 0
        },
        events: {
          // 'onStateChange': videostatus,
          // 'onReady': playerReady
          'onReady': loadVideo
        }

    });

  }


  var seconds = 0;
    var timer;
    function onPlayerReady(event) {
        event.target.playVideo();

    }

    var seconds = 0;
    var timer;
    function onPlayerReady(event) {
        event.target.playVideo();

    }

    function loadVideo(e) {
        e.target.cueVideoById({
            'videoId': '6FOD7Gixde8',
            'suggestedQuality': 'large'
        });
         timeupdater = setInterval(updateTime, 100);
    }

  function getVidState() {

      videoState = player.getPlayerState();
      return videoState;
  }





          function updateTime() {

              videotime = Math.round(player.getCurrentTime());
              getVidState()

                getTimeline()
          }


var video=1

function getTimeline(){

    if(video==1){

        $('headerFinales1').hide();
         $('headerFinales2').hide();
          $('headerFinales3').hide();

      if(videotime < 25){
            $('#headerFinales').hide();
        }

      if (videotime >= 25){

          $('#headerFinales').show();
          // $('#btnRepetir').show();
      }

       if (videotime >= 33){
            player.pauseVideo();
            // $('#btnRepetir').show();
        }

    }
    else if(video==2 ){

        if(videotime <= 25){
            hideBtns()
        }

        if (videotime == 31){
            showBtns()
        }

        if (videotime >= 34){
            player.pauseVideo();
        }


    }
    else if(video==3){

        if(videotime <= 36){
            hideBtns()
        }

        if (videotime >= 38){
            showBtns()
        }

        if(videotime >= 49){
            player.pauseVideo();
        }

    }

    else if(video==4){

        if(videotime <= 35){
            hideBtns()
        }

        if (videotime >= 38){

            $('.headerFinales3').show();
            showBtns()
        }

        if (videotime >= 50){
            player.pauseVideo();
        }

    }


}


      var  $ = jQuery;
        $(document).ready(function(){
          $('.headerContent a').click(function(){

              video=1
              console.log('Me tocaste');
              player.playVideo();

              $('.headerContent').fadeOut().animate(function(){
                  left: 0
              },1000);

              event.preventDefault();
          });


          $('.btn1').click(function(){
              video=2
              player.loadVideoById({
                  videoId:'aZraB6ULrqM'
                });
               hideBtns()

          });
          $('.btn2').click(function(){
              video=3
              player.loadVideoById({
                  videoId:'JrYrjPqZLQM'
                });
              hideBtns()
          });
          $('.btn3').click(function(){
              video=4
              player.loadVideoById({
                  videoId:'M0dUGgW-SHM'
                });
              hideBtns()
          });

     });


        function hideBtns(){

 $('.btn1').hide();
                 $('.btn2').hide();
                  $('.btn3').hide();

        }



        function showBtns(){


if(video==1){
 $('.btn1').show();
                 $('.btn2').show();
                  $('.btn3').show();

        }


else if(video==2){
 $('.btn2').show().css({

              'top': '65px',
              'right': '21%'

                });

                  $('.btn3').show();

        }

        else if(video==3){
 $('.btn1').show();

                  $('.btn3').show();

        }

           else if(video==4){
 $('.btn1').show();

                  $('.btn2').show().css({
                              'right': '20%',
                              'top': '356px'
                  });

        }

}

