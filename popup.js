$(document).ready(function(){
  // Open a new tab if the user clicks on an image
  $('body').on('click', 'ul a', function(e){
    $('#copy').val(e.target.src);
    $('#copy').focus();
    $('#copy').select();
    document.execCommand('Copy');

    $('body').css('height', '420');
    $('#send-to-friend').css('display', 'block');

  });

  $(".random").on('click',function(){
    $('body').css('height', 'auto');

    $('.loading').css('display', 'block');

    // Empty the list on each request
    $('.gifs').empty();

    var xhr = $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC");
    xhr.done(function(data) {
      $('#send-to-friend').css('display', 'none');
      $('.loading').css('display', 'none');

      $(".gifs").append('<li class="rand"><a href="'+ data.data.image_url +'"><img src='+ data.data.image_url +'></img></a></li>');
    });
  });

  $(".trending").on('click',function(){
    $('body').css('height', 'auto');

    $('.loading').css('display', 'block');

    // Empty the list on each request
    $('.gifs').empty();

    var limit = 6;

    var xhr = $.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit="+ limit);
    xhr.done(function(data) {
      $('#send-to-friend').css('display', 'none');
      $('.loading').css('display', 'none');

      _.each(data.data, function (gif) {
        imageUrl = gif.images.downsized.url;
        $(".gifs").append('<li><a href="'+ gif.url +'"><img src='+ imageUrl +'></img></a></li>');
      });

    });
  });

  // Get the search value on submit
  $("#search").submit(function(e){
    e.preventDefault();

    $('body').css('height', 'auto');

    $('.loading').css('display', 'block');

    // Empty the list on each request
    $('.gifs').empty();

    var query = $('#search').serializeArray()[0].value;
    var limit = 6;

    // Get the gifs from the giphy api
    var xhr = $.get("http://api.giphy.com/v1/gifs/search?q="+ query + "&api_key=dc6zaTOxFJmzC&limit="+ limit);
    xhr.done(function(data) {

      $('#send-to-friend').css('display', 'none');
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

  $('#send-to-friend').submit(function (e) {
    e.preventDefault();
    var data = $('#send-to-friend').serializeArray();

    var to = data[0].value;
    var from = data[1].value;

    var message = '<img src='+ $('#copy').val() +'></img>';

    $('#send-to-friend').css('display', 'none');
    sendgrid(to, from, message);
  });


  // Extremely hacky but sends the email
  var sendgrid = function (to, from, message) {
    var payload = {
      'to': to,
      'from': from,
      'html': message,
      'subject': "A friend has sent you a gif from Gif Me!",
      'api_key': Config.password,
      'api_user': Config.username
    };

    var http = new XMLHttpRequest();
    http.open('POST','https://api.sendgrid.com/api/mail.send.json', false);
    http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    query = [];
    for (var key in payload) {
      query.push(encodeURIComponent(key) + '=' + encodeURIComponent(payload[key]));
    }
    console.log(http.send(query.join('&')));
  };
});

