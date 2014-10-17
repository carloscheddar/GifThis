$(document).ready(function() {
  $("body").on("click", "ul a", function(e) {
    $("#copy").val(e.target.src);
    $("#copy").focus();
    $("#copy").select();
    document.execCommand("Copy");
  });
  $(".random").on("click", function() {
    var xhr;
    $("body").css("height", "auto");
    $(".loading").css("display", "block");
    $(".gifs").empty();
    xhr = $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC");
    xhr.done(function(data) {
      $("#send-to-friend").css("display", "none");
      $(".loading").css("display", "none");
      $(".gifs").append("<li class=\"rand\"><a href=\"" + data.data.image_url + "\"><img src=" + data.data.image_url + "></img></a></li>");
    });
  });
  $(".trending").on("click", function() {
    var limit, xhr;
    $("body").css("height", "auto");
    $(".loading").css("display", "block");
    $(".gifs").empty();
    limit = 6;
    xhr = $.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=" + limit);
    xhr.done(function(data) {
      $("#send-to-friend").css("display", "none");
      $(".loading").css("display", "none");
      _.each(data.data, function(gif) {
        var imageUrl;
        imageUrl = gif.images.downsized.url;
        $(".gifs").append("<li><a href=\"" + gif.url + "\"><img src=" + imageUrl + "></img></a></li>");
      });
    });
  });
  $("#search").submit(function(e) {
    var limit, query, xhr;
    e.preventDefault();
    $("body").css("height", "auto");
    $(".loading").css("display", "block");
    $(".gifs").empty();
    query = $("#search").serializeArray()[0].value;
    limit = 6;
    xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=" + limit);
    xhr.done(function(data) {
      $("#send-to-friend").css("display", "none");
      $(".loading").css("display", "none");
      if (data.pagination.count === 0) {
        $(".gifs").append("<li><p>No gif found.</p></li>");
        return;
      }
      _.each(data.data, function(gif) {
        var imageUrl;
        imageUrl = gif.images.downsized.url;
        $(".gifs").append("<li><a href=\"" + gif.url + "\"><img src=" + imageUrl + "></img></a></li>");
      });
    });
  });
});
