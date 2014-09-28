var query = 'kittens';
var limit = 5;

var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+ query + "&api_key=dc6zaTOxFJmzC&limit="+ limit);
xhr.done(function(data) {

  _.each(data.data, function (gif) {
    $(".gifs").append('<li><a href="'+ gif.url +'">Gif</a></li>');
  });
});