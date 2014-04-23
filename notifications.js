document.addEventListener('DOMContentLoaded', function () {

  bbcRequireMap = {
      "jquery-1.9":"jquery-1.9.1",
     "swfobject-2":"swfobject-2",
          "bump-3":"bump-3"
  }
  require({ paths: bbcRequireMap,
      waitSeconds: 30 });

  require(['bump-3'],function ($) {
    var settings = {
       product : 'iplayer',
       playerProfile: 'smp',
       responsive: true
    }
    var mediaPlayer = $('#mediaPlayer').player(settings);
    mediaPlayer.load('http://www.bbc.co.uk/iplayer/playlist/bbc_one_london');
  });

});
