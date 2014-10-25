# Method for showing and hiding the loading gif
Loading =
  show: ->
    $(".loading").removeClass "is-hidden"
  hide: ->
    $(".loading").addClass "is-hidden"

# Only add image to packer once it's loaded
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

createItems = (results, container) ->
  fragment = document.createDocumentFragment()
  _.each results, (data) ->
    item = document.createElement("div")
    item.className = "item is-hidden"
    img = document.createElement("img")

    img.src = data.images.downsized.url
    item.appendChild img
    fragment.appendChild item
    container.append fragment

randomItems = (results, container) ->
  fragment = document.createDocumentFragment()
  _.each results, (response) ->
    item = document.createElement("div")
    item.className = "item is-hidden"
    img = document.createElement("img")

    img.src = response.data.image_url
    item.appendChild img
    fragment.appendChild item
    container.append fragment

getTrending = ($container) ->
  limit = 25
  $.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=" + limit)
  .done (results) ->
    createItems results.data, $container
    loadImages($container)


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

  $container.packery
    itemSelector: ".item"
    gutter: 2