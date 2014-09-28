$(document).ready(function(){
  // Open a new tab if the user clicks on an image
  $('body').on('click', 'a', function(e){
    $('#copy').val(e.target.src);
    $('#copy').focus();
    $('#copy').select();
    document.execCommand('Copy');
    var popup = "Copied!";
    popup.fadeIn();
    popup.fadeOut();
  });

  $(".random").on('click',function(){
    var limit = 6;
    var xhr = $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&limit="+ limit);
    xhr.done(function(data) {

      $('.loading').css('display', 'none');

      $(".gifs").append('<li><a href="'+ data.data.image_url +'"><img src='+ data.data.image_url +'></img></a></li>');
    });
  });
  // Get the search value on submit
  $("form").submit(function(e){
    e.preventDefault();

    $('.loading').css('display', 'block');

    // Empty the list on each request
    $('.gifs').empty();

    var query = $('form').serializeArray()[0].value;
    var limit = 6;

    // Get the gifs from the giphy api
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+ query + "&api_key=dc6zaTOxFJmzC&limit="+ limit);
    xhr.done(function(data) {

      $('.loading').css('display', 'none');

      //Return if result is empty
      if (data.pagination.count === 0) {
        $(".gifs").append('<li><p>No gif found.</p></li>');
        return;
      }

      _.each(data.data, function (gif) {
        imageUrl = gif.images.downsized.url;
        $(".gifs").append('<li><a href="'+ gif.url +'"><img src='+ imageUrl +'></img></a></li>');
      });
    });
  });
});
