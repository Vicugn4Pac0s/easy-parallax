import { TweenMax } from "gsap";

export default class {
  constructor() {
    let self = this;
    this.parallax_array = [];
    this.setScroll();
    $(window).on("scroll", function () {
      self.setScroll();
      self.parallax();
    });
  }
  parallax() {
    let self = this;
    this.parallax_array.forEach(function (value, index, array) {
      let distance = self.Scroll_b - value.first;
      if (0 < distance && distance < value.last) {
        let per, translate_y, target, cssStyle;
        per = distance / value.last;
        translate_y = -1 * value.parallax * per;
        translate_y  = Math.floor(translate_y);

        target = "." + value.id;
        cssStyle = {
          transform: "translateY(" + translate_y + "px)",
        };

        if (value.is_firsttime) {
          $(target).css(cssStyle);
          value.is_firsttime = false;
          return;
        }
        TweenMax.staggerTo(
          target,
          0.6,
          cssStyle,
          0.1
        );
      }
    });
  }
  reset(parallax_array) {
    this.parallax_array = parallax_array;
  }
  setScroll() {
    this.Scroll = $(window).scrollTop();
    this.Scroll_b = this.Scroll + $(window).height();
  }
}
