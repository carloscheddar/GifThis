var Loading, createItems, getQuery, getRandom, getTrending, hideBig, loadImages, randomItems, removeItems;

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

hideBig = function() {
  $("#container").removeClass('is-hidden');
  return $('#big').addClass('is-hidden');
};

createItems = function(results, container) {
  var fragment;
  fragment = document.createDocumentFragment();
  return _.each(results, function(data) {
    return $('<div class="item is-hidden"><img src="' + data.images.downsized.url + '"></div>').data("url", data.images.original.url).appendTo('#container');
  });
};

randomItems = function(results, container) {
  var fragment;
  fragment = document.createDocumentFragment();
  return _.each(results, function(response) {
    return $('<div class="item is-hidden"><img src="' + response.data.fixed_width_downsampled_url + '"></div>').data("url", response.data.image_url).appendTo('#container');
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

getQuery = function($container) {
  var limit, query;
  limit = 25;
  query = $('#search').serializeArray()[0].value;
  return $.get("http://api.giphy.com/v1/gifs/search?q=" + query + "&api_key=dc6zaTOxFJmzC&limit=" + limit).done(function(results) {
    if (results.pagination.count === 0) {
      Loading.hide();
      $container.append('<div class="item not-found"><p>No Gif Found.</p></div>');
      return;
    }
    createItems(results.data, $container);
    return loadImages($container);
  });
};

docReady(function() {
  var $container;
  $container = $('#container');
  $('.trending').on('click', function() {
    hideBig();
    removeItems();
    Loading.show();
    return getTrending($container);
  });
  $('.random').on('click', function() {
    hideBig();
    removeItems();
    Loading.show();
    return getRandom($container);
  });
  $('#search').on('submit', function(e) {
    hideBig();
    e.preventDefault();
    removeItems();
    Loading.show();
    return getQuery($container);
  });
  $('#container').on('click', '.item', function(e) {
    var url;
    $('#big img').remove();
    url = $(e.target).parent().data().url;
    $("#container").addClass('is-hidden');
    $('#big').removeClass('is-hidden');
    $('#copy').val(url);
    $('#copy').focus();
    $('#copy').select();
    document.execCommand('Copy');
    return $('<img src="' + url + '">').appendTo('#big');
  });
  $('.back').on('click', function(e) {
    hideBig();
    return $('#container').packery();
  });
  return $container.packery({
    itemSelector: ".item",
    gutter: 2
  });
});
