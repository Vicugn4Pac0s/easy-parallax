/*
  Copyright (c) 2021 Yoshiki Yamada
  Released under the MIT license
  https://opensource.org/licenses/mit-license.php
*/
import Parallax from "./core";

(function ($) {
  $.fn.parallax = function (options) {
    return new Parallax(this, $, options);
  };
})(jQuery);
