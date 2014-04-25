document.addEventListener('DOMContentLoaded', function () {
  var userId = 'd4IWpoGAOv';

    Parse.initialize("HqY70JxiKFrNUw3vfkBReWPWz1RhxnBafk8d42d9", "hHmCthbw6fh4BU9wZ5dpnwqMinvZrcPxAwOU4d1K");

getUser();
getNotifications();
getTrack();


function getNotifications() {
  $('#notifications').empty();
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
  $('.recent').prepend(notif_html);
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
  $('.header').text(user.get("Name")+"'s Radio");
}

function getTrack(){
  $.getJSON("https://api.live.bbc.co.uk/realtime/services/bbc_radio_one/message.json", function(data) {
      showTrack(data.message);
  }); 
}

function showTrack(track){
  $('.nowplaying').text(track.programme.episode_title);
}

$('#audioicon').click(function(){
  console.log("clicked");
  chrome.runtime.sendMessage({radio: "radio"}, function(response) {
        console.log(response);
    });
});

});
