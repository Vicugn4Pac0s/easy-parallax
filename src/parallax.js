import {TweenMax} from "gsap";

export default class {
  constructor() {
    let self = this;
    this.parallax_array = [];
    this.setScroll();
    $(window).on('scroll', function() {
      self.setScroll();
      self.start();
    });
  }
  set(parallax_array) {
    this.parallax_array = parallax_array;
  }
  start() {
    let self = this;
    this.parallax_array.forEach(function(value, index, array) {
      let distance = self.Scroll_b - value.first;
      if (0 < distance && distance < value.last) {
        var per = distance / value.last,
          per = Math.floor(per * 100) / 100;
  
        if (value.is_firsttime) {
          $("." + value.id).css({
            transform: 'translateY(' + -1 * value.parallax * per + 'px)',
          });
          value.is_firsttime = false;
          return;
        }
        TweenMax.staggerTo(
          "." + value.id,
          0.6,
          { transform: "translateY(" + -1 * value.parallax * per + "px)" },
          0.1
        );
      }
    });
  }
  setScroll() {
    this.Scroll = $(window).scrollTop();
    this.Scroll_b = this.Scroll + $(window).height();
  }
}