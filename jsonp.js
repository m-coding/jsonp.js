/* jsonp.js, (c) Przemek Sobstel 2012, License: MIT */

var $jsonp = (function(){
  var that = {};

  that.send = function(src, opt) {
    var options = opt || {},
      callback_name = options.callbackName || 'callback',
      on_success = options.onSuccess || function(){},
      on_timeout = options.onTimeout || function(){},
      timeout = options.timeout || 10,
      params = options.data || {};

    var query = "?";
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            query += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
        }
    }

    var timeout_trigger = window.setTimeout(function(){
      window[callback_name] = function(){};
      on_timeout();
    }, timeout * 1000);

    window[callback_name] = function(data){
      window.clearTimeout(timeout_trigger);
      on_success(data);
    };

    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.src = src + query;

    document.getElementsByTagName('head')[0].appendChild(script);
  };

  return that;
})();

