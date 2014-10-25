var createItems, makeItemElem;

makeItemElem = function(data, container, fragment) {
  var img, item;
  item = document.createElement("div");
  item.className = "item is-hidden";
  img = document.createElement("img");
  console.log(data);
  img.src = data.data.image_url;
  item.appendChild(img);
  fragment.appendChild(item);
  return container.appendChild(fragment);
};

createItems = function(results, container) {
  var fragment;
  fragment = document.createDocumentFragment();
  return _.each(results, function(response) {
    var img, item;
    item = document.createElement("div");
    item.className = "item is-hidden";
    img = document.createElement("img");
    console.log(response);
    img.src = response.data.image_url;
    item.appendChild(img);
    fragment.appendChild(item);
    return container.appendChild(fragment);
  });
};

docReady(function() {
  var container, pckry, promise, results;
  results = {};
  container = document.querySelector("#container");
  promise = $.when(_.times(20, function(n) {
    return $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC").done(function(data) {
      return results[n] = data;
    });
  }));
  promise.done(function(data) {
    return $.when.apply($, data).done(function() {
      var imgLoad;
      createItems(results, container);
      imgLoad = imagesLoaded(container);
      return imgLoad.on("progress", function(imgLoad, image) {
        var itemElem;
        if (!image.isLoaded) {
          return;
        }
        itemElem = image.img.parentNode;
        classie.remove(itemElem, "is-hidden");
        pckry.appended(itemElem);
        return pckry.layout();
      });
    });
  });
  return pckry = new Packery(container, {
    itemSelector: ".item",
    gutter: 2,
    "columnWidth": 196
  });
});
