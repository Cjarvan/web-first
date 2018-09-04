(function($){
    $.fn.bullet = function(option){
      var defaults = {
      
      }
    option = $.extend({}, defaults, option); 
    var _this = this
    var startflag = false
    var _width = this.width()
    var _height = this.height()
    var moveleft = _width
    var arr = []
    var timer = null
    var ns = 0
    //暂停，开启按钮
    $('.switch').bind('click',function(){
        option = !startflag
        if(option.startflag){
            clearInterval(timer)
            timer = setInterval(bulletmove,80)
        }else{
           	clearInterval(timer)
        }
    })
    //显示隐藏弹幕
    $('#ishide').bind('click',function(){
      if($("#ishide").is(':checked')){
        $("#bullet").css("opacity", 1);
      }else{
      $("#bullet").css("opacity", 0);
      }
    })
    //发送弹幕
    $('.bulletBtn').bind('click',function(){
      var val = $('.bulletText').val()
      var color = $('#color').val()
      var size = $('#text_size').val()
      var positions = $('#position').val()
      $('.bulletText').val('')
    var Start = function(){
  	 	  this.starttop =Math.random()*_height/2;
  	 	  this.startleft =_width;
  	   	this.buttetnode =document.createElement("div")
	    }
    	Start.prototype.init = function(){
    	 	this.buttetnode.starttop =this.starttop
    	 	if(positions == 0){
    	 	  this.buttetnode.style.whiteSpace = 'nowrap'
          this.buttetnode.style.position = 'absolute'
    	 	  this.buttetnode.style.left =_width +"px"
    	 	  this.buttetnode.style.top = this.starttop +"px"
    	 }else{
    	 	  this.buttetnode.style.textAlign = 'center'
    	 }
    	 	this.buttetnode.className = 'bullet'
    	 	this.buttetnode.style.color = color
    	 	if(size ==1){
    	 		this.buttetnode.style.fontSize = '28px'
    	 	}else{
    	 		this.buttetnode.fontSize = '14px'
    	 	}
    	 	this.buttetnode.innerHTML = val 
    	 	this.buttetnode.changes = positions
    	    this.buttetnode.n=_width;
    	 	return this.buttetnode; 
    	 }
       //创建弹幕函数
    	function creatnew(){
    		var obj = new Start();
    		var  once =obj.init()	
        if(val===''){
          return
        }
    		$('#bullet').append(once)
    		arr.push(once);
    		var clonearr = $.extend(true,{},arr)
    		for(var i=0; i<arr.length; i++){
    		  if(arr[i].changes == 0){
          clearInterval(timer)
    		  timer = setInterval(bulletmove,80)
    		  }else if(arr[i].changes == 1){
    			var index = i
    		  setTimeout(function(){
    			$(clonearr[index]).remove()
    			arr.splice(index,1)
    			},5000)	
    		}
    	}
    }
    	  creatnew()
      })
      //弹幕移动函数
      function bulletmove(){
      	for(var i=0; i<arr.length; i++){
      		if(arr[i].changes == 0){
      		  arr[i].n -= 1
    		    arr[i].style.left = arr[i].n+"px"
    		    if(arr[i].n < -($(arr[i]).width())){
    			    $(arr[i]).remove()
    		      arr.splice(i,1)
    			  }
    		  }
    	  }
      }
    }
})(jQuery)