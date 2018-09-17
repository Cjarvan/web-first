(function($){
	$.fn.accordion = function(option){
    	var defaults = {
    	  	imgheight:360,  //图片的高度
    	  	imgwidth:500,	//图片的宽度
    	  	chooseindex:0,	//默认哪张图片显示
    	  	liwidth:100, 	//外层li的宽度
    	}
    	options = $.extend({}, defaults, option);
    	//最外层div的宽度 由li和img的宽度决定
    	var containW = ($('.contain li').length-1)*options.liwidth+options.imgwidth+20
    	$('.contain').css({
    		'width':containW
    	})
    	$('.contain li img').css({
    		'width':options.imgwidth,
    		'height':options.imgheight,
    	})
    	$('.contain li').css({
    		'overflow':'hidden',
			'display':'inline-block',
    		'width':options.liwidth
    	})
    	$('.contain li').eq(options.chooseindex).css({
    		'width':options.imgwidth
    	})
    	$('.contain li').bind('mouseover',function(){
    		$(this).stop(true).animate({'width':options.imgwidth},1000).siblings().stop(true).animate({'width':options.liwidth},1000)
    	})
    }
})(jQuery)