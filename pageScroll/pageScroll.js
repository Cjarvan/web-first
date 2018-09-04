(function($){
	var defaults = {
		container : '.pageScroll-container',
		scrollbox : '.pageScroll-scrollbox',
		section : '.pageScroll-section',
		index : 0,			//默认开始的页码
		easing : 'ease',	//滚动的贝塞尔曲线
		duration : 500,		//滚动时间间隔
		direction : 'vertical',		//横纵向滚动设置，默认纵向。
		keyboard : true,  //是否可以键盘控制滚动
		list : []	//滚动每个页面的值
	};
	 $.fn.pageScroll = function(options){
			obj = $.extend({},defaults, options);
			scrollbox = this.find(obj.scrollbox);
			section = scrollbox.find(obj.section);
			callback = obj.callback;
			callbackIndex = obj.callbackIndex;
			index = obj.index;
			if(index == 0){
				$('.pre').hide()
			}		
			if(index === section.length-1){
				$('.next').hide()
			}
			var direction = (obj.direction === 'vertical' ? true : false);
			if(!direction) {
				initLayout();
			}
			initPage(obj.list.length); 
			intiEvent();
		}

	//向上一屏事件
	var preSection = function() {
		index--; 
		$('.pre').show()
		$('.next').show()	
		if(index <= 0){
			index = 0;
			$('.pre').hide()	
		}
			
		scrollPage();
	}
	//向下滚动一屏事件
	var nextSection = function() {
		index++; 
		$('.next').show()
		$('.pre').show()
		if(index >= section.length-1){
			index = section.length-1
			$('.next').hide()
		}		
		scrollPage();
	}
	//事件的初始化
	intiEvent = function() {
		//为每个pages下的li绑定点击事件
		$('.pages li').on('click', function() {
			// if (canScroll) {
				index = $(this).index();
				scrollPage();
			// };
		});
		$('.pre').on('click',function(){
			// if(canScroll){
				preSection()
			// }
		})
		//为每个next，pre点击添加时间
		$('.next').on('click', function() {
			// if(canScroll) {
				nextSection();
			// }
		});
		//鼠标滚动
		$(document).on('mousewheel DOMMouseScroll', function(e) {
			var delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
			// if(canScroll) {
				if(delta >0){
					preSection();
				}else{
					nextSection();
				}
			// }
		});

		//键盘事件
		if(obj.keyboard){
			$(window).on('keydown', function(e) {
				var keyCode = e.keyCode;
				// if(canScroll){
					if(keyCode ==37 || keyCode == 38){
						preSection();
					}else if(keyCode == 39 || keyCode == 40){
						nextSection();
					}
				// }
			});
		}
		//窗口改变大小让回到原来的位置
		var resizeID;
		$(window).resize(function() {
			clearTimeout(resizeID);
			resizeID = setTimeout(function() {
				scrollPage();
			}, 500);
		});

	}
	//横向布局函数
	function initLayout() {
		var length = section.length,
			width = (length * 100) + '%',
			cellwidth = (100 / length).toFixed(2) + '%';
		scrollbox.width(width);
		section.width(cellwidth).css({'float' : 'left'});
	}

	//导航分页模块
	function initPage(pagesNumber) {
		if(obj.direction == 'vertical') {
			// 竖屏 pageScroll-scrollbox
			var margin_l = -25 * pagesNumber;
			var pageHtml = '<div class="right_nav"><ul class="pages">';
			for (var i = 0; i < section.length; i++) {
				pageHtml += '<li><span>' + obj.list[i] + '</span></li>';
			};
			pageHtml += '</ul></div>';
			$('body').append(pageHtml);
			pages = $('body').find('.pages');
			pages.find('li').eq(index).addClass('active');
			$('body').find('.right_nav').addClass('vertical').css({
				'margin-top' : margin_l + 'px'
			});
			pages.find('li').find('span').css({'left' : '20px'});
			pages.find('li').eq(index).find('span').css({'left' : '-90px'});
			$('.pre').css({
				'position': 'absolute',
				'width': 46,
				'height': 46,
				'top': 22,
				'left': 50+'%',
				'background-image': 'url("../Cimages/bg.png")',
				'background-position':'-56px 0px',
				'cursor': 'pointer',
				'cursor': 'pointer',
				'z-index': 100
			})
			$('.next').css({
				'position': 'absolute',
				'width': 46,
				'height': 46,
				'bottom': 22,
				'left': 50+'%',
				'background-image': 'url("../Cimages/bg.png")',
				// -0 -0 ,
				'cursor': 'pointer',
				'z-index': 100
			})
				$('.pages li span ').css({
					'position': 'absolute',
					'background-image': "url('../Cimages/right_nav_bg.png')" ,
					'font-size': '12px',
					'color': '#333',
					'text-align': 'center',
					'line-height': '20px',
					'z-index': '-10',
					 'background-position':'0 2px',
					'background-repeat':'no-repeat'
				})
		}else {
			// 横屏
			var margin_l = -15 * pagesNumber;
			var pageHtml = '<div class="bottom_nav"><ul class="pages">';
			for (var i = 0; i < section.length; i++) {
				pageHtml += '<li><span>'+ obj.list[i] +'</span></li>';
			};
			pageHtml += '</ul></div>';
			$('body').append(pageHtml);
			pages = $('body').find('.pages');
			pages.find('li').eq(index).addClass('active');
			$('body').find('.bottom_nav').addClass('horizontal').css({
				'margin-left' : margin_l + 'px'
			});
			pages.find('li').find('span').css({'top' : '20px'});
			pages.find('li').eq(index).find('span').css({'top' : '-90px'});
		$('.pre').css({
				'position': 'absolute',
				'width': 60,
				'height': 60,
				'top': 50+'%',
				'left': 22,
				'background-image': 'url("../Cimages/btn.gif")',
				'cursor': 'pointer',
				'z-index': 100
			})
		$('.next').css({
				'position': 'absolute',
				'width': 60,
				'height': 60,
				'top': 50+'%',
				'right': 22,
				'background-image': 'url("../Cimages/btn.gif") ',
				// -60 -0 ,
				'background-position':'0 60px',
				'cursor': 'pointer',
				'z-index': 100
			})
			$('.pages li span ').css({
					'position': 'absolute',
					'background-image': "url('../Cimages/bottom_nav_bg.png')" ,
					'font-size': '12px',
					'color': '#333',
					'text-align': 'center',
					'line-height': '20px',
					'z-index': '-10',
					'background-repeat':'no-repeat'
				})
		}
	}
	//是否支持css的某个属性
	function isSuportCss(property){
		var body = $("body")[0];
		for(var i=0; i<property.length;i++){
			if(property[i] in body.style){
				return true;
			}
		}
		return false;
	}
	//页面滚动事件
	function scrollPage() {
		var parentP = section.eq(index).position();
		if(typeof parentP === 'underfined') return;
		var transform = ["-webkit-transform","-ms-transform","-moz-transform","transform"],
			transition = ["-webkit-transition","-ms-transition","-moz-transition","transition"];
		if(isSuportCss(transition) && isSuportCss(transform)) {
			scrollbox.css({
				'transition' : 'all ' + obj.duration + 'ms ' + obj.easing
			});
			var translate = obj.direction == 'vertical' ? 'translateY(-' + parentP.top + 'px)' : 'translateX(-' + parentP.left + 'px)';
			scrollbox.css({
					'transform' : translate
			});
		}
		$('.pages li').eq(index).addClass('active').siblings().removeClass('active');
		if(obj.direction == 'vertical'){
			$('.pages li').eq(index).find('span').animate({
				left : -90
			}, obj.duration).parent().siblings().children().animate({
				left : 20
			}, obj.duration);
		}else{
			$('.pages li').eq(index).find('span').animate({
				top : -90
			}, obj.duration).parent().siblings().children().animate({
				top : 20
			}, obj.duration);
		}
	}
})(jQuery);