// howler v0.0.2 by Jason Sohl
// tiny js library for growl-style messages with
// custom sticky option and timeout

// usage: $.howl(message,sticky,timeout);

// message is any text
// sticky is true or false (default: false)
// timeout is in milliseconds (default: 5000)
(function ($) {

  var $body = $('body'), howl_id = 1, animationTime = 500;

  $body.on('click', '.howl', dismissHowl);

  function dismissHowl(e){
    e.preventDefault();
    e.stopImmediatePropagation();

    var $howl = $(this);

    $howl.toggleClass('hide', true);
    setTimeout(function(){
      $howl.toggleClass('show', false);
      setTimeout(function(){
        $howl.remove();
      },animationTime);
    },animationTime);
  }

  $.extend({
    _howl: function(message,sticky,timeout){
      this.message = message;
      this.timeout = timeout;
      this.sticky = sticky;
      this.id = howl_id;
      howl_id++;
    },

    howl: function (message,sticky,timeout) {
      sticky = sticky || false;
      timeout = Math.floor(timeout) || 5000;

      var thisHowl = new this._howl(message,sticky,timeout);

      if ( !$('#howl-c').length ) {
        $body.append('<div id="howl-c"><div class="inner-c"></div></div>');
      }

      var newHowl = "<div class='howl show ";
      if (sticky) { newHowl += "howl-sticky"; }
      newHowl += "' data-id='"+thisHowl.id+"'><div class='inner'><p>"+thisHowl.message+"</p></div></div>";

      $('#howl-c .inner-c').append(newHowl);
      var $thisHowl = $('#howl-c').find('.howl[data-id="'+(thisHowl.id)+'"]');
      setTimeout(function(){
        $thisHowl.toggleClass('open', true).css('height', $thisHowl.height());
      },animationTime);

      if (!thisHowl.sticky) {

        setTimeout(function(){

          $thisHowl.toggleClass('hide', true);
          setTimeout(function(){
            $thisHowl.toggleClass('show', false);
            setTimeout(function(){
              $thisHowl.remove();
            },animationTime);
          },animationTime);

        },thisHowl.timeout);
      }
    }

  });
})(jQuery);
