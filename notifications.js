
document.addEventListener('DOMContentLoaded', function () {
  document.location.origin = "http://www.bbc.co.uk";

  bbcRequireMap = {
      "jquery-1.9":"../jquery-1.9",
     "swfobject-2":"swfobject-2",
          "bump-3":"bump-3"
  }
  require({ paths: bbcRequireMap,
      waitSeconds: 30 });

  require(['bump-3'],function ($) {

    

    var
        $playerContainer
        , _player
        , _playlistBase
        , $itemsContainer
        , $items
        , _totalItems
    ;

    Parse.initialize("HqY70JxiKFrNUw3vfkBReWPWz1RhxnBafk8d42d9", "hHmCthbw6fh4BU9wZ5dpnwqMinvZrcPxAwOU4d1K");


 
        // Nuke the cookie warning:
        $('#bbccookies').remove();

       // PlayHistory.init();

        var settings = {
            product : 'iplayer',
            playerProfile: 'smp',
            autoplay: true,
            responsive: true
        };

        $playerContainer = $('.stream-smp');
        _player = $playerContainer.player(settings);


        _playlistBase = $playerContainer.attr('data-smp-base');
        _player.height('60px');
        _player.width('300px');
        playItem('bbc_radio_one');
         getUser();
        getNotifications();



    function playItem(pid, timecode) {
        //PlayHistory.ended();
        timecode = timecode || 0;


        // Set the current PID and play!
        //PlayHistory.startedPlaying(pid, timecode);

        _player.load(_playlistBase+pid);
        _player.bind('playing', function() {
            _player.currentTime(timecode);
            _player.unbind('playing');
        });

        
    }



    $('.stream-item').on('click', function(e){
        e.preventDefault();
        playItem($(this).attr('data-pid'));
    });

function getNotifications() {
  $('#notifications').empty();
  var Notification = Parse.Object.extend("Notification");
    var query = new Parse.Query(Notification);

    query.find({
      success: function(results) {
        console.log("Successfully retrieved " + results.length + " notifications.");
        // Do something with the returned Parse.Object values
        for (var i = 0; i < 3; i++) { 
          var object = results[i];
          object.set("read", true);
          object.save();
          showNotification(object);
        }
        
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
         handleError();
      }
    });
}

function showNotification(notification){
  var notif_html = '<div class="notification">';
  var image = '<img src="'+notification.get("image")+'"/>';
  var data = '<h2>'+ notification.get("title")+'</h2>'+'<p>'+ notification.get("subtitle")+'</p>' ;           
  notif_html = notif_html +image+data+'</div>';
  $('.recent').prepend(notif_html);
}

function getUser(){
  var BBCUser = Parse.Object.extend("BBCUSer");
    var query = new Parse.Query(BBCUser);

    query.first({
      success: function(object) {
        console.log("Successfully user");

          showUser(object);
        
        
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
}

function showUser (user){
  $('.header').text(user.get("Name")+"'s Radio");
  $('.nowplaying').text(user.get("NowPlaying"));
}


  });
});

