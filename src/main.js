/*
  Copyright (c) 2021 Yoshiki Yamada
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
*/
import EasyParallax from "./core";

(function ($) {
  $.fn.easyParallax = function (options) {
    return new EasyParallax(this, $, options);
  };
})(jQuery);
