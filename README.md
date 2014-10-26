Gif This!
=====

Gif This! is a chrome extension that queries the [Giphy API](https://github.com/giphy/GiphyAPI) to display gifs and copy their url.
![](http://i.imgur.com/hQ99EvP.png)

## How Gif This! Happened
We use gifs everyday to chat with friends, but it's always been a hassle to enter a site, search for a gif in said site and then copy the image just to share it with friends.<br>
![](http://media.giphy.com/media/3uyIgVxP1qAjS/giphy-tumblr.gif)<br>

So then came the idea of making an extension where you can search for a gif and have the link copied directly to your clipboard.<br>
![](http://media.giphy.com/media/y2c0Zh26JmOAw/giphy-tumblr.gif)

## No "copy image url"!
Once you see the gif you want to share, just click it and it's copied to your clipboard to paste anywhere you want. This makes sharing gifs with friends almost instant. We also expand the gif to make it easier to read subtitled gifs.

## Why use Giphy?

![](http://media1.giphy.com/media/E7yX6ZvDlYmEE/giphy.gif)<br>
![](http://i.imgur.com/qO8Mjum.gif)<br>
Giphy offers an easy way to search for gifs and also offers a simple to use API.

### The API calls we used

- **Search**  
  We use the search endpoint to query get at most 25 results related to that string.

- **Trending**  
  We use the trending endpoint to get at most 25 results and display them to the user.

- **Random**  
  Currently the random request responds with 1 gif. So we currently make 10 requests and display the gifs in the random section. This is the only difference from the other sections.

## Making it pretty
  While at HackPR September 2014 we built most of the interface but displaying images with different heights didn't look nice. So we updated it to use [Packery.js](http://packery.metafizzy.co/) which packs up the images nicely without any gaps.  
![](http://media2.giphy.com/media/B3ETOq2MtxqOQ/giphy.gif)
