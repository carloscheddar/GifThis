makeItemElem= (data, container, fragment) ->

  item = document.createElement("div")
  item.className = "item is-hidden"
  img = document.createElement("img")

  console.log data
  img.src = data.data.image_url
  item.appendChild img
  fragment.appendChild item
  container.appendChild fragment


createItems = (results, container) ->
  fragment = document.createDocumentFragment()
  _.each results, (response) ->
    item = document.createElement("div")
    item.className = "item is-hidden"
    img = document.createElement("img")

    console.log response
    img.src = response.data.image_url
    item.appendChild img
    fragment.appendChild item
    container.appendChild fragment


docReady ->
  results = {}
  container = document.querySelector("#container")

  promise = $.when _.times 20, (n) ->
    $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC")
    .done (data) ->
      results[n] = data


  promise.done (data) ->
    $.when.apply($, data).done ->
      createItems results, container
      imgLoad = imagesLoaded(container)
      imgLoad.on "progress", (imgLoad, image) ->
        return  unless image.isLoaded
        itemElem = image.img.parentNode
        classie.remove itemElem, "is-hidden"
        pckry.appended itemElem
        pckry.layout()

  pckry = new Packery(container,
    itemSelector: ".item"
    gutter: 2,
    "columnWidth": 196,
  )

