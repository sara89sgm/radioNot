require(['jquery-1.9','bump-3'],function (jquery, $) {
  var userId = 'd4IWpoGAOv';

  jquery('body').append("<div class='myradio'><div class='bar'><div class='barinner'><div class='radioheader'>Rory's radio</div><img class='episodepic' src='#'' /><div class='playing_panel'><div id='audioicon'><div class='bars'></div><div class='bars'></div><div class='bars'></div><div class='bars'></div><div class='bars'></div></div><div class='duration'>1:23:00 / 3:00:00</div><div class='nowplaying'>Gilles Peterson <span class='episode'>Howie B in conversation</span></div></div><div class='track_panel'><img class='trackpic' src='#' /><img class='playlister' src='https://dl.dropboxusercontent.com/u/15226972/myradio/img/playlister.png' /><div class='duration'>TRACK NOW PLAYING</div><div class='trackplaying'><span class='trackartist'>Artist name</span> <span class='tracktitle'>Howie B in conversation</span></div></div></div></div><div class='drawer'><div class='drawer_inner'><div class='recent'></div></div></div></div>");

  jquery('.header').click(function(){
    jquery('.myradio').toggleClass('drawer_open');
  });
  jquery('.playing_panel').click(function(){
    jquery('.track_panel').toggle();
  });
  var settings = {
   product : 'iplayer',
   playerProfile: 'smp',
   responsive: true
 };
    //var mediaPlayer = $('#mediaPlayer').player(settings);
    //mediaPlayer.load('http://www.bbc.co.uk/iplayer/playlist/bbc_one_london');

Parse.initialize("HqY70JxiKFrNUw3vfkBReWPWz1RhxnBafk8d42d9", "hHmCthbw6fh4BU9wZ5dpnwqMinvZrcPxAwOU4d1K");

    getUser();
    getNotifications();
    getTrack();
    window.setTimeout(getTrack, 5000);


function getNotifications() {
  jquery('.recent').empty();
  var Notification = Parse.Object.extend("Notification");
  var query = new Parse.Query(Notification);
  query.equalTo("userId", userId);
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
  var image = '<div class="image"><img src="'+notification.get("image")+'"/></div>';
  var data = '<h2>'+ notification.get("title")+'</h2>'+'<p>'+ notification.get("subtitle")+'</p>' ;           
  notif_html = notif_html +image+data+'</div>';
  jquery('.recent').prepend(notif_html);
}

function getUser(){
  var BBCUser = Parse.Object.extend("BBCUSer");
    var query = new Parse.Query(BBCUser);

    query.get(userId,{
      success: function(object) {
          showUser(object);   
      },
      error: function(error) {
        console.log("Error: " + error.code + " " + error.message);
      }
    });
}

function showUser (user){
  jquery('.radioheader').text(user.get("Name")+"'s Radio");
  jquery('.episodepic').attr('src', user.get("image"));
  
}

function getTrack(){
  $.getJSON("https://api.live.bbc.co.uk/realtime/services/bbc_radio_one/message.json", function(data) {
      showTrack(data.message);
  }); 
}

function showTrack(track){
  console.log(track);
  jquery('.nowplaying').text(track.programme.episode_title);
  jquery('.tracktitle').text(track.title);
  jquery('.trackartist').text(track.artist);
  jquery('.trackpic').attr('src', 'http://ichef.bbci.co.uk/images/ic/96x96/'+track.record_image_pid);
}
});