(function($){
  $.fn.tab=function(option){
    var defaults = {
      //各种参数，各种属性
      active:"active", //选项卡选定属性
      tabNav:".tab-nav>li", //选项卡导航元素
      tabContent:".tab-content>div", //选项卡内容元素
      eventType:"click" //选项卡事件
    }
    var options = $.extend({},defaults,option);
    this.each(function() {
      //实现功能代码
      var that = $(this);
      that.find(options.tabNav).bind(options.eventType,function(){
        $(this).addClass(options.active).siblings().removeClass(options.active);
        var index = $(this).index();
        that.find(options.tabContent).eq(index).show().siblings().hide();
      });
    });
    return this;
  }
})(jQuery);