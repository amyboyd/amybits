// IE doesn't style elements it doesn't recognise.
// This must be run before anything else.
// See http://net.tutsplus.com/tutorials/html-css-techniques/how-to-make-all-browsers-render-html5-mark-up-correctly-even-ie6/
'article,aside,figcaption,figure,footer,header,hgroup,nav,section,summary'.split(',').map(function(it) {
  document.createElement(it);
});
