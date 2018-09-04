(function($){
    $.fn.gundong = function(option){
    	var defaults = {
    	  	speed:10,  //滚动速度
    	  	direction:'position', //判断滚动方向以及轮番方式
            flag:true,   //轮番图是否显示缩略图
            num:3     //缩略图显示的个数
    	}
    	options = $.extend({}, defaults, option); 
    	var n = 0
        var timer = null
    	var _width = $('.turn_1').width()
        var _imgW = $('.turn_1 img').width()
        var _imgH = $('.turn_1 img').height()
    	var _length =$('.turn_1 li').length
    	var _width = $('.turn_1 li').outerWidth()*_length
    	var _height = $('.turn_1 li').outerHeight()*_length
        var _smallimgW = _imgW /options.num
        var _smallimgH = _imgH /options.num  
        //判断滚动方向
    	if(options.direction ==='right'||options.direction ==='left'){
    	  	n = -_width
            $('.turn_2').html($('.turn_1').html())
    	  	$('.scrollAll').css({
    	  		'height': _imgW,
    	  	 	'overflow': 'hidden',
    	  	  	'margin':'10px auto',
    	  	    'width': '1200px'
    	  	})
    	  	$('.scroll').css({
    	  		'width':_width*2,
    	  		'margin-left':-_width
    	  	})
    	  	$('.scroll .turn_1').css({'float':'left'})
    	  	$('.scroll ul li').css({'float':'left'})
    	}else if(options.direction ==='left'){
    	    n = 0
    	}else if(options.direction ==='top'||options.direction ==='bottom'){
    	  	n = 0
            $('.turn_2').html($('.turn_1').html())
    	  	$('.scrollAll').css({
	  			'height': '600px',
	  			'overflow': 'hidden',
	  			// 'margin':'0px auto',
	  			'width': $('.turn_1 li').outerWidth()
	  		})
    	}else if(options.direction ==='bottom'){
	  		n = -_height
	  		$('.scroll').css({
	  		'margin-top':-_height
    	    })
    	}else if(options.direction ==='position'){
            $('.turn_2').html($('.turn_1').html()+$('.turn_1').html())
	  		$('.scrollAll').css({
	  			'height':$('.turn_1 li').outerHeight(),
	  			'width': $('.turn_1 li').outerWidth(),
	  			'overflow': 'hidden',
	  			// 'margin':'0px auto'
	  		})
	  		$('.scroll').css({
	  			'position':'relative',
	  			'height':$('.turn_1 li').outerHeight(),
	  			'width': $('.turn_1 li').outerWidth()
	  		})
	  		$('.scroll .turn_1 li').css({
	  			'position':'absolute',
	  			'left':0,
	  			'top':0
	  		})
            $('.mengl').bind('mouseover',function(){
                $('.left_btn').show()
            })

             $('.mengr').bind('mouseover',function(){
                $('.right_btn').show()
            })
            $('.left_btn').bind('mouseover',function(){
                $('.left_btn').show()
            })
             $('.mengl').bind('mouseout',function(){
                $('.left_btn').hide()
            })
            $('.right_btn').bind('mouseover',function(){
                $('.right_btn').show()
            }) 
             $('.mengr').bind('mouseout',function(){
                $('.right_btn').hide()
            })
            //判断是否显示缩略图
            if(options.flag){ 
                $('.scrollAll').css({
                    'height':$('.turn_1 li').outerHeight()+_smallimgH,
                    'width': $('.turn_1 li').outerWidth(),
                    'overflow': 'hidden',
                    // 'margin':'0px auto'
            })
                $('.turn_2').css({
                    'position':'absolute',
                    'height':_smallimgH,
                    'width':'1200px',
                    'left':0,
                    'top':_imgH
              })  
                $('.turn_2 li').css({
                    'height':_smallimgH,
                    'width':_smallimgW,
                    'float':'left'
                })
                $('.turn_2 li img').css({
                    'height':_smallimgH,
                    'width':_smallimgW,
                    'float':'left'
               })
            }else{
                $('.turn_2').hide()
            }
    	var now = 0;
		var last =0;
        timer=setInterval(rightmove, 2000);
        $('.left_btn').bind('click',function(){
            now--;
            last = now+1;
            if(now==-1){
                now=_length-1;
            }
            tab();
        })
        function rightmove(){
              now++;
            last =now-1
            if(now==_length)
            {
            now=0;
            }
            tab();
        }
        $('.right_btn').bind('click',rightmove)
        for(var i = 0; i < _length ; i++){
            $('.turn_2 li')[i].index = i;
            $($('.turn_2 li')[i]).bind('click',function() {
                console.log(this.index)
                if(this.index ==now) return 
                now = this.index    
                tab();
                })
            $($('.turn_2 li')[i]).bind('mouseover', function(){
               $($('.turn_2 li')[this.index]).css({'opacity':1})
                })
            $($('.turn_2 li')[i]).bind('mouseout',function(){
                if(this.index != now){
                $($('.turn_2 li')[this.index]).css({'opacity':0.3})
                }
            })
        }
        //轮番方法
    	function tab(){
    	  	for(var i = 0;i<_length;i++){
    	  	 	$($('.turn_1 li')[i]).css({
    	  	 		'z-index' : 0
                }) 
                $($('.turn_2 li')[i]).css({
                    'opacity':0.3   
    	  	 	})
        	  	$($('.turn_1 li')[last]).css({'z-index':1})
        		$($('.turn_1 li')[now]).css({'z-index':2})
        		$($('.turn_2 li')[now]).animate({'opacity':1},300)
        		$($('.turn_1 li')[now]).css({'height':0})	
    			$($('.turn_1 li')[now]).animate({'height':_imgH},600)
    			if(now==0){
                    $('.turn_2').animate({'left':0},300)
       			}
    			else if(now ==_length-1){
                    $('.turn_2').animate({'left':-(now-2)*$('.turn_2 li').width()},300)
    				
    			}
    			else{	
    			$('.turn_2').animate({'left':-(now-1)*$('.turn_2 li').width()},300)
    		    }
            }
        }
    }
    //滚动方法
    if(options.direction!=='position'){
    	timer = setInterval(scroll,80)
            function scroll(){   	  
    	  	if(options.direction ==='right'){
    	  	n = n+options.speed	  		 	  
    	  	$('.scroll').stop().animate({'margin-left':n+'px'},300
    			)
    	 	 if(n >= 0){
    	  				n = -_width
    	  				n = n+options.speed
    	  			$('.scroll').stop().animate({'margin-left':-_width+'px'},0)	
    	  		}
    	  	}else if(options.direction ==='left'){
    	  	n = n-options.speed	  		 	  
    	  	$('.scroll').stop().animate({'margin-left':n+'px'},300
    			)
    	  		if(n <-_width){
    	  				n = 0
    	  				n = n-options.speed
    	  			$('.scroll').stop().animate({'margin-left':0+'px'},0)	
    	  			}
    	  	}else if(options.direction ==='top'){
    	  	n = n-options.speed	  		 	  
    	  	$('.scroll').stop().animate({'margin-top':n+'px'},
    			)
    	  		if(n <-_height){
    	  				n = 0
    	  				n = n-options.speed
    	  			$('.scroll').stop().animate({'margin-top':0+'px'},0)	
    	  			}
    	  	}else if(options.direction ==='bottom'){
    	  	n = n+options.speed	  		 	  
    	  	$('.scroll').stop().animate({'margin-top':n+'px'},
    			)
    	  		if(n >= 0){
    	  				n = -_height
    	  				n = n+options.speed
    	  			$('.scroll').stop().animate({'margin-top':-_height+'px'},0)	
    	  			}
    	  	    }	
    	    }
        }
        //鼠标放上，放下对应的暂停和启动定时器
        $('.scrollAll').bind('mouseover',function(){
            clearInterval(timer)
        })
         $('.scrollAll').bind('mouseout',function(){
            clearInterval(timer)
            if(options.direction ==='position'){
                timer = setInterval(rightmove, 2000)
            }else{
                timer = setInterval(scroll,80)
            }
        })
    }
})(jQuery)