# Method for showing and hiding the loading gif
Loading =
  show: ->
    $(".loading").removeClass "is-hidden"
  hide: ->
    $(".loading").addClass "is-hidden"

# Only add image to packery once it's loaded
loadImages= ($container)->
  imgLoad = imagesLoaded($container)
  imgLoad.on "progress", (imgLoad, image) ->
    Loading.hide()
    return  unless image.isLoaded
    itemElem = image.img.parentNode
    classie.remove itemElem, "is-hidden"
    $container.packery('appended', itemElem)
    $container.packery()

# Remove items from container
removeItems= ->
  $('.item').remove().promise()

# Appends images to the container
createItems = (results, container) ->
  fragment = document.createDocumentFragment()
  _.each results, (data) ->
    $('<div class="item is-hidden"><img src="' + data.images.downsized.url + '"></div>')
    .data "url", data.images.original.url
    .appendTo('#container')

# Same as createItems but using the random format
randomItems = (results, container) ->
  fragment = document.createDocumentFragment()
  _.each results, (response) ->
    $('<div class="item is-hidden"><img src="' + response.data.fixed_width_downsampled_url + '"></div>')
    .data "url", response.data.image_url
    .appendTo('#container')

# Query giphy for 25 trending gifs
getTrending = ($container) ->
  limit = 25
  $.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=" + limit)
  .done (results) ->
    createItems results.data, $container
    loadImages($container)

# Get 10 random gifs
# Right now a random request returns a single gif so we make
# 10 requests and store them in the results object
getRandom = ($container) ->
  results = {}
  promise = $.when _.times 10, (n) ->
    $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
    .done (data) ->
      results[n] = data

  promise.done (data) ->
    $.when.apply($, data).done ->
      randomItems results, $container
      loadImages($container)

# Query giphy for specific tags using the search input
getQuery = ($container) ->
  limit = 25
  query = $('#search').serializeArray()[0].value
  $.get("http://api.giphy.com/v1/gifs/search?q="+ query + "&api_key=dc6zaTOxFJmzC&limit="+ limit)
  .done (results) ->
    createItems results.data, $container
    loadImages($container)


# Where the magic happens
docReady ->
  $container = $('#container')

  $('.trending').on 'click', ->
    removeItems()
    Loading.show()
    getTrending($container)

  $('.random').on 'click', ->
    removeItems()
    Loading.show()
    getRandom($container)

  $('#search').on 'submit', (e)->
    e.preventDefault()
    removeItems()
    Loading.show()
    getQuery($container)

  # Copy the image url and show big image
  $('#container').on 'click', '.item', (e) ->
    $('#big img').remove()
    # Get url using jquery data
    url = $(e.target).parent().data().url

    # Toggle containers
    $("#container").addClass('is-hidden')
    $('#big').removeClass('is-hidden')

    # Change input value in order to copy to the clipboard
    $('#copy').val(url)
    $('#copy').focus()
    $('#copy').select()
    document.execCommand('Copy')

    # Append image to the big container
    $('<img src="' + url + '">').appendTo('#big')

  # Go back to the results container
  $('.back').on 'click', (e) ->
    $("#container").removeClass('is-hidden')
    $('#big').addClass('is-hidden')
    $('#container').packery()

  # Load packery
  $container.packery
    itemSelector: ".item"
    gutter: 2