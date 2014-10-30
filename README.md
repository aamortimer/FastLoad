FastLoad
===

Speed up the loading of web pages by only loading the main content of the page, reducing the need to re-load CSS/JavaScript.

Load FastLoad, the first parameter is the links to apply FastLoad to and the second parameter needs to reference the main page content.

```javascript
  FastLoad('nav a', '#content');
```

Events that you can hook into

```javascript
  // add code you want to run just after click event
  $(window).on('fastload:click', function() {

  });

  // add any analytics tracking here
  $(window).on('fastload:complete', function() {

  });
```