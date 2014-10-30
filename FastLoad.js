var FastLoad = function(nav, body) {
  // do nothing if pushState is not supported
  if (typeof window.history.pushState !== "function") {
    return true;
  }

  // code to remove HTML tags
  String.prototype.decodeHTML = function() {
    return $("<div>", {html: "" + this}).text()
  }

  // function to load the page content
  load_page_content = function(ele, body) {
    var link = $(ele),
        href = link.attr('href'),
        title = link.attr('title'),
        container = $(body);

    // check if the domain matches the site domain,
    // if not just quit out
    if (href.indexOf(document.domain) === -1) {
      return true;
    }

    // trigger a click event
    $(window).trigger('fastload:click');

    container.load(href + ' ' + body, function(data) {
      title = data.match("<title>(.*?)</title>")[0].trim().decodeHTML();
      history.pushState({}, title, href);
      document.title = title;

      // trigger a complete task
      $(window).trigger('fastload:complete');

      return true;
    });
  };


  // code to run when refreshing the page, 
  // to make sure we end up on the correct page.
  $(window).on('popstate', function(e) {
    return load_page_content(body)
  });

  // code to load page content 
  $(nav).on('click', function(e) {
    e.preventDefault();
    return load_page_content(this,body);
  });
}