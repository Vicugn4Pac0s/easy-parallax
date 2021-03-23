import { TweenMax } from "gsap";

export default class {
  constructor(options) {
    let self = this;
    this.options = options;
    this.parallax_array = [];
    this.setScroll();

    let flag = 0;
    $(window).on("scroll", function () {
      if (flag) return;
      flag = 1;
      setTimeout(function () {
        flag = 0;
      }, 35);
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
        translate_y = Math.floor(translate_y);

        target = "." + value.id;
        cssStyle = {
          transform: "translateY(" + translate_y + "px)",
        };

        if (value.is_firsttime) {
          $(target).css(cssStyle);
          if (self.options.fadeIn) {
            let Tween = TweenMax.to(target, 1, { opacity: 1 });
            Tween.delay(0);
          }
          value.is_firsttime = false;
          return;
        }
        TweenMax.staggerTo(target, 0.6, cssStyle, 0.1);
      } else if (distance < 0) {
        let target = "." + value.id;
        TweenMax.staggerTo(
          target,
          0.6,
          {
            transform: "translateY(0px)",
          },
          0.1
        );
      } else if (value.last < distance) {
        let target = "." + value.id;
        let translate_y;
        translate_y = -1 * value.parallax * 1;
        translate_y = Math.floor(translate_y);
        TweenMax.staggerTo(
          target,
          0.6,
          {
            transform: "translateY(" + translate_y + "px)",
          },
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
