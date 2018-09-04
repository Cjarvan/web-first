(function($)
{
    var defaults = 
    {   // 阴影
        shadeColor: "#fff", //颜色
        shadeBorder: "#FF8000", //边框颜色
        shadeOpacity: 0.5,  //透明度
        cursor: "move",     //鼠标形状
        //放大图片显示区域
        layerWidth: 400,    //宽
        layerHeight: 300,   //高   
        layerBorder: "#DDD",    //边框颜色
        // fade:true, 
        //放大图片
        largeWdith: 1280,  // 宽 
        largeHeight: 960    // 高
    }
    
    var enlarge = function(option)
    {
        options = $.extend({}, defaults, option);
        $(this).each(function() 
        {
            var self = $(this).css("position", "relative");
            var img = self.children().first();
            var scale =
            {
                x: img.width() / options.largeWdith,
                y: img.height() / options.largeHeight
            }
            //阴影的宽高
            var layerSize = 
                {
                    width: options.layerWidth * scale.x ,
                    height: options.layerHeight * scale.y 
                }   
            //阴影的css属性
            var shade = $("<div>").css(
            {
                "position": "absolute",
                "left": "0px",
                "top": "0px",
                "background-color": options.shadeColor,
                "border": "1px solid " + options.shadeBorder,
                "width": layerSize.width,
                "height": layerSize.height,
                "opacity": options.shadeOpacity,
                "cursor": options.cursor
            });
            shade.hide().appendTo(self);
            //放大图片的css属性
            var large = $("<img>").css(
            {
                "position": "absolute",
                "display": "block",
                "width": options.largeWdith,
                "height": options.largeHeight,
            });
            //放大图片显示区域的css属性
            var layer = $("<div>").css(
            {
                "position": "absolute",
                "left": self.width() + 6,
                "top": 0,
                "overflow": "hidden",
                "width": options.layerWidth,
                "height": options.layerHeight,
                "border": "1px solid " + options.layerBorder
            });
            //绑定放大图片的src路径，并添加到self元素上
            large.attr("src", img.attr("src"));
            layer.append(large);
            layer.hide().appendTo(self);
            //鼠标位置
            var centers = 
            {
                x: layerSize.width / 2,
                y: layerSize.height / 2
            }
            //移动的区域
            var areas = 
            {
                width: self.innerWidth() - shade.outerWidth(),
                height: self.innerHeight() - shade.outerHeight()
            }
            
            var offset = self.offset();
            //放大区域显示
            var show = function()
            {
                offset = self.offset();
                shade.show();
                // if(options.fade){
                    layer.stop().fadeIn(300)
                // }else{
                //     layer.show()};
            }
            //放大区域隐藏
            var hide = function()
            {
                shade.hide();
                layer.hide();
            }
            //鼠标在图片移动区域
            self.mousemove(function(e)
            {
                var x = e.pageX - offset.left;
                var y = e.pageY - offset.top;
                if(x < 0 || x > self.innerWidth()) return hide();
                if(y < 0 || y > self.innerHeight()) return hide();
                x = x - centers.x;
                y = y - centers.y;
                if(x < 0) x = 0;
                if(y < 0) y = 0;
                if(x > areas.width) x = areas.width;
                if(y > areas.height) y = areas.height;
                shade.css(
                {
                    left: x,
                    top: y
                });
                large.css(
                {
                    left: (0 - x / scale.x),
                    top: (0 - y / scale.y)
                });
            })
            .mouseenter(show)
            .mouseleave(hide);
        });
    }
    $.fn.extend(
    {
        enlarge: enlarge
    });
})(jQuery)
