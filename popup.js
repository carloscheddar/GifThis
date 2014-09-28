$(document).ready(function(){
   $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
   });

  var query = 'korra';
  var limit = 5;

  var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+ query + "&api_key=dc6zaTOxFJmzC&limit="+ limit);
  xhr.done(function(data) {

    _.each(data.data, function (gif) {
      imageUrl = gif.images.downsized.url;
      $(".gifs").append('<li><a href="'+ gif.url +'"><img src='+ imageUrl +'></img></a></li>');
    });
  });
});