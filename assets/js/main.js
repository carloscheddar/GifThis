var Loading, createItems, getRandom, getTrending, loadImages, randomItems, removeItems;

Loading = {
  show: function() {
    return $(".loading").removeClass("is-hidden");
  },
  hide: function() {
    return $(".loading").addClass("is-hidden");
  }
};

loadImages = function($container) {
  var imgLoad;
  imgLoad = imagesLoaded($container);
  return imgLoad.on("progress", function(imgLoad, image) {
    var itemElem;
    Loading.hide();
    if (!image.isLoaded) {
      return;
    }
    itemElem = image.img.parentNode;
    classie.remove(itemElem, "is-hidden");
    $container.packery('appended', itemElem);
    return $container.packery();
  });
};

removeItems = function() {
  return $('.item').remove().promise();
};

createItems = function(results, container) {
  var fragment;
  fragment = document.createDocumentFragment();
  return _.each(results, function(data) {
    var img, item;
    item = document.createElement("div");
    item.className = "item is-hidden";
    img = document.createElement("img");
    img.src = data.images.downsized.url;
    item.appendChild(img);
    fragment.appendChild(item);
    return container.append(fragment);
  });
};

randomItems = function(results, container) {
  var fragment;
  fragment = document.createDocumentFragment();
  return _.each(results, function(response) {
    var img, item;
    item = document.createElement("div");
    item.className = "item is-hidden";
    img = document.createElement("img");
    img.src = response.data.image_url;
    item.appendChild(img);
    fragment.appendChild(item);
    return container.append(fragment);
  });
};

getTrending = function($container) {
  var limit;
  limit = 25;
  return $.get("http://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC&limit=" + limit).done(function(results) {
    createItems(results.data, $container);
    return loadImages($container);
  });
};

getRandom = function($container) {
  var promise, results;
  results = {};
  promise = $.when(_.times(10, function(n) {
    return $.get("http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC").done(function(data) {
      return results[n] = data;
    });
  }));
  return promise.done(function(data) {
    return $.when.apply($, data).done(function() {
      randomItems(results, $container);
      return loadImages($container);
    });
  });
};

docReady(function() {
  var $container;
  $container = $('#container');
  $('.trending').on('click', function() {
    removeItems();
    Loading.show();
    return getTrending($container);
  });
  $('.random').on('click', function() {
    removeItems();
    Loading.show();
    return getRandom($container);
  });
  return $container.packery({
    itemSelector: ".item",
    gutter: 2
  });
});
