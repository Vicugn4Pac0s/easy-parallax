import Parallax from "./parallax";

export default class {
  constructor($_elements, $, options = {}) {
    let defaults = {};
    this.settings = $.extend({}, defaults, options);
    this.$_elements = $_elements;
    this.parallax_array = [];
    this.Parallax = new Parallax();

    this.init();
    this.events();
  }
  init() {
    let self = this,
        wH = $(window).height();
    this.parallax_array = [];
    this.$_elements.each(function(index) {
      let Obj = {
        id: "parallax-" + index,
        state: 0,
        first: $(this).offset().top,
        last: $(this).height() + wH,
        parallax: $(this).data('parallax') || $(this).height() + $(this).width(),
      }
      $(this).addClass(Obj.id);
      self.parallax_array.push(Obj);
    });
    this.Parallax.set(this.parallax_array);
  }
  events() {
    let self = this;
    $(window).on("resize", function () {
      self.init();
    });
  }
}