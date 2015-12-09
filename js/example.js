/*jshint forin:true, noarg:true, noempty:true, eqeqeq:true, bitwise:true, strict:true, undef:true, unused:true, curly:true, browser:true, devel:true, jquery:true, indent:4, maxerr:50, laxcomma:true, indent:false, unused: false */

;(function($, doc, win){
  "use strict";

  var $body = $('body');

  function init(){
    listen();
  }

  function listen(){
    $body.on('click', '#create-howl', createHowl);
  }

  function createHowl(){
    var $btn = $(this),
        message = $btn.data('message'),
        timeout = Math.floor($btn.data('timeout')),
        sticky = $btn.data('sticky');

    $.howl(message,sticky,timeout);
  }

  $(function(){
    init();
  });

})(jQuery, document, window);