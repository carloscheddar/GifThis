Gif This!
=====

Gif This! is a chrome extension that queries the [Giphy API](https://github.com/giphy/GiphyAPI) to display gifs and .

![](https://photos-3.dropbox.com/t/1/AACbtpT5gNqJOsps8Afpsue26GDORvLJkXhAaTzVs2aM3A/12/3933894/png/1024x768/3/1411920000/0/2/Screenshot%202014-09-28%2010.27.45.png/d1CP8m5e5dcU97D9aLzsl0T0g4G_gCcVhGmYXB9_P20)

## How Gif This! Happened
We use gifs everyday to chat with friends, but it was always a hastle to enter a site, search for the gif in said site and then copy the image just so i could send it to friends.<br>
![](http://media.giphy.com/media/3uyIgVxP1qAjS/giphy-tumblr.gif)<br>

So then came the idea of making an extention where you can search for a gif and have the link copied directly to your clipboard.
![](http://media.giphy.com/media/y2c0Zh26JmOAw/giphy-tumblr.gif)


## Why use Giphy?

![](http://media1.giphy.com/media/E7yX6ZvDlYmEE/giphy.gif)

Giphy offers an easy way to search for gifs and also offers a simple to use API.

### The API calls we used

- Search  
  We allow the user to search for any string and we show at most 6 gifs related to the search query
  
- Trending  
  We query Giphy for their trending gifs and show them to the user.

- Random  
  We show a single gif that the random API call delivers. 
  Because it's only 1 the gif takes the whole width of the extension instead of being in one of the 2 columns.
