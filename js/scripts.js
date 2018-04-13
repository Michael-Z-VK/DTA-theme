(function($) {
  'use strict';

  Drupal.behaviors.dtagovau = {
    attach: function(context, settings) {
      $('main', context).once('behaviors').addClass('processed');
    }
  }

  Drupal.behaviors.dtagovauSmoothScroll = {
    attach: function(context, settings) {
      $('a', context).once('smoothScroll').click(function(event) {
        var speed = 500;
        var href = $(this).attr("href").split('#')[1];
        console.log(href);
        if (href) {
          $(this, context).once('behaviours').addClass('processed');
          console.log($('#' + href));
          var position = $('#' + href).offset().top;
          $('html, body').animate({ scrollTop: position }, speed, "swing");
          event.preventDefault();
        }
      });
    }
  }
  Drupal.behaviors.dtagovauChosenAccessibilityFix = {
    // Fixes an accessibility issue with the Chosen library.
    attach: function(context, settings) {
      $('body').on('chosen:ready', function(evt, params) {
        $('.js-form-item.js-form-type-select', context).once('chosenAccessibilityFix').each(function(index, element) {
          $(this).find('.chosen-container-multi input.chosen-search-input').attr('aria-label', $.trim($(this).find('label').text()));
        });
      });
    }
  }
  Drupal.behaviors.dtagovauSVGSwap = {
    // Swaps out SVG images for PNGs on non-supporting browsers. Taken from
    // https://css-tricks.com/a-complete-guide-to-svg-fallbacks/.
    attach: function(context, settings) {
      function svgasimg() {
        return document.implementation.hasFeature(
          "http://www.w3.org/TR/SVG11/feature#Image", "1.1"
        );
      }
      if (svgasimg()) {
        $('img, IMG', context)
          .once('svg-swapped')
          .each(function(index, element) {
            if ($(this).attr('src').match(/svgz?$/)) {
              $(this).attr('src', $(this).attr('data-fallback'));
            }
          });
      }
    }
  }
}(jQuery));
