(function($) {
    $.fn.drag = function(option) {
        var defaults = {
            clearance:10,   //间隔
            column:3,       //列数
            liswidth:100,   //子元素下的宽
            lisheight:80,   //子元素下的高
           animateSpeed: 3000,  //交换执行时间
        };
        options = $.extend({},defaults, option);
        return this.each(function(index, el) {
            var $this = $(this);
            var $ul = $(this).find("ul");
            var $lis = $(this).find("li");
            var map = []; //节点的位置信息
            var line = Math.ceil($lis.length/options.column)
            init();
            //初始化
            function init() {
            		for (var i = 0; i < line; i++) {
            			 for(var y = options.column*i; y < options.column*(i+1); y++){
            			 	var lisX = options.liswidth*(y%options.column)+(y%options.column)*options.clearance
            			 	var lisY = options.lisheight*i+i*options.clearance
            			 	if($lis[y]){
            				$lis[y].style.left = lisX+'px'
            				$lis[y].style.top = lisY+'px'
            			}
            				 map.push({
                        	 left: lisX,
                        	 top: lisY
                        })
            				bindEvent($($lis[y])); 
            			 }
            		}
                }
            //绑定事件
            function bindEvent($li) {
                var index = $li.index();
                  //鼠标点击
                  $li.bind("mousedown", function(event) {
                    var event = event || window.event;
                    var startX = event.clientX;
                    var startY = event.clientY;
                    var target_index = null;
                    $li[0].style.zIndex++;
                    //点击移动
                    function mousemoves(event) {
                        var event = event || window.event;
                     	event.preventDefault()
                        var changeX = event.clientX - startX;
                        var changeY = event.clientY - startY;
                        startX = event.clientX;
                        startY = event.clientY;
                        $li[0].style.top = $li[0].offsetTop + changeY + "px";
                        $li[0].style.left = $li[0].offsetLeft + changeX + "px"; 
                    }
                    //鼠标释放
                    function mouseups() {
                    	target_index = findTarget($li);
                        $(document).unbind("mousemove", mousemoves);
                        $(document).unbind("mouseup", mouseups);
                        if (target_index !== null) {
                            // 成功交换
                            var swap = map[target_index];
                            map[target_index] = map[index];
                            map[index] = swap;
                            $li.animate(map[index], options.animateSpeed);
                            $lis.eq(target_index).animate(map[target_index], options.animateSpeed);
                        } else {
                            //失败还原
                            $li.animate(map[index], options.animateSpeed, function() {
                                $li[0].style.zIndex--;
                            });
                        }
                    }

                    $(document).bind("mousemove", mousemoves);
                    $(document).bind("mouseup", mouseups);
                });
            }
            // 碰撞检测
            function findTarget($li) {
                var top = $li[0].offsetTop;
                var left = $li[0].offsetLeft;
                var width = $li[0].offsetWidth;
                var height = $li[0].offsetHeight;
                var mint = 9999;
                var minl = 9999;
                var min_index = null; 
                for (var i = 0; i < map.length; i++) {
                    if (Math.abs((map[i].top - top)) < height&& Math.abs((map[i].top - top)) < mint&& Math.abs((map[i].left - left)) < minl&&Math.abs((map[i].left-left))<width&& i !== $li.index()) {
                        min_index = i;
                        min = Math.abs((map[i].top - top));
                        minl = Math.abs((map[i].left - left));
                    }
    				
                }
                return min_index;
            }
        });
    };
})(jQuery);