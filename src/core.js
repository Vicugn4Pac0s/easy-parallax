import Parallax from "./parallax";

export default class {
  constructor($_elements, $, options = {}) {
    let defaults = {
      'fadeIn': false,
    };
    this.options = $.extend({}, defaults, options);
    this.$_elements = $_elements;
    this.parallax_array = [];
    this.Parallax = new Parallax(this.options);

    this.init();
    this.events();
  }
  init() {
    let self = this,
        wH = $(window).height();
    if(this.parallax_array.length) {
      this.parallax_array.forEach(function(value, index, array) {
        let $_target = $("." + value.id);
        value.first = $_target.offset().top;
        value.last = $_target.height() + wH;
        value.parallax = $_target.data('parallax') || $_target.height() + $_target.width();
      });
    } else { //一回目
      this.$_elements.each(function(index) {
        let Obj = {
          id: "parallax-" + index,
          is_firsttime: true,
          first: $(this).offset().top,
          last: $(this).height() + wH,
          parallax: $(this).data('parallax') || $(this).height() + $(this).width(),
        }
        $(this).addClass(Obj.id);
        self.parallax_array.push(Obj);
      });
      if(this.options.fadeIn) this.$_elements.css({'opacity': '0'});
    }
    this.Parallax.reset(this.parallax_array);
    this.Parallax.parallax();
  }
  events() {
    let self = this;
    $(window).on("resize", function () {
      self.init();
    });
  }
}