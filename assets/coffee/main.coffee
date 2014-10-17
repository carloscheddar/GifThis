$(document).ready ->

  # Open a new tab if the user clicks on an image
  $("body").on "click", "ul a", (e) ->
    $("#copy").val e.target.src
    $("#copy").focus()
    $("#copy").select()
    document.execCommand "Copy"
    return

  $(".random").on "click", ->
    $("body").css "height", "auto"
    $(".loading").css "display", "block"

    # Empty the list on each request
    $(".gifs").empty()
    xhr = $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
    xhr.done (data) ->
      $("#send-to-friend").css "display", "none"
      $(".loading").css "display", "none"
      $(".gifs").append "<li class=\"rand\"><a href=\"" + data.data.image_url + "\"><img src=" + data.data.image_url + "></img></a></li>"
      return

    return

  $(".trending").on "click", ->
    $("body").css "height", "auto"
    $(".loading").css "display", "block"

    # Empty the list on each request
    $(".gifs").empty()
    limit = 6
    xhr = $.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=" + limit)
    xhr.done (data) ->
      $("#send-to-friend").css "display", "none"
      $(".loading").css "display", "none"
      _.each data.data, (gif) ->
        imageUrl = gif.images.downsized.url
        $(".gifs").append "<li><a href=\"" + gif.url + "\"><img src=" + imageUrl + "></img></a></li>"
        return

      return

    return


  # Get the search value on submit
  $("#search").submit (e) ->
    e.preventDefault()
    $("body").css "height", "auto"
    $(".loading").css "display", "block"

    # Empty the list on each request
    $(".gifs").empty()
    query = $("#search").serializeArray()[0].value
    limit = 6

    # Get the gifs from the giphy api
    xhr = $.get("http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=" + limit)
    xhr.done (data) ->
      $("#send-to-friend").css "display", "none"
      $(".loading").css "display", "none"

      #Return if result is empty
      if data.pagination.count is 0
        $(".gifs").append "<li><p>No gif found.</p></li>"
        return
      _.each data.data, (gif) ->
        imageUrl = gif.images.downsized.url
        $(".gifs").append "<li><a href=\"" + gif.url + "\"><img src=" + imageUrl + "></img></a></li>"
        return

      return

    return

  return
