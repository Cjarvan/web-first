<h1>jQ插件</h1>
<h4>banner turn(无缝滚动及轮番图)</h4>
<p>使用方式</p>
<pre>
	<script src="../js/jquery-3.3.1.min.js"></script>
	 <script src="./banner.js"></script>
	<script type="text/javascript">	
		$(function(){
			$('.scroll').gundong()
		})
	</script>
	参数解析
	speed:10,  滚动速度
    direction:'left' 无缝向左滚动,'right' 无缝向右滚动,'top' 无缝向上滚动,'bottom' 无缝向下滚动,'position' 轮番图显示;
    flag:true 轮番图显示缩略图, false 轮番图不显示缩略图;
    num:3   //缩略图显示的个数
</pre>
<a href="http://www.cjarvan.cn/banner/banner.html">效果预览</a>
<hr/>
<h4>bullet(弹幕滚动)</h4>
<p>使用方式</p>
<pre>
	<script src="../js/jquery-3.3.1.min.js"></script>
	 <script src="./bullet.js"></script>
	<script type="text/javascript">	
		$(function(){
			$('#bulletarea').bullet()
		})
	</script>
	参数解析
</pre>
<a href="http://www.cjarvan.cn/bullet/bullet.html">效果预览</a>
<hr/>
<h4>pageScroll(整页翻转)</h4>
<p>使用方式</p>
<pre>
	<script src="../js/jquery-3.3.1.min.js"></script>
	 <script src="./pageScroll.js"></script>
	<script type="text/javascript">	
		$('.block').pageScroll({
			direction : 'vertical',
			list : ['小学','初中','高中','大学']
		});
	</script>
	参数解析
	container : '.pageScroll-container',  //根元素
	scrollbox : '.pageScroll-scrollbox',  //全部页数div的父元素的class属性
	section : '.pageScroll-section',	//每页div的class属性
	index : 0,			//默认开始的页码
	easing : 'ease',	//滚动的贝塞尔曲线
	duration : 500,		//滚动时间间隔
	direction : 'vertical',		//横纵向滚动设置，默认纵向，如果不是vertical值时为横向
	keyboard : true,  //是否进行键盘控制翻页
	list : []	//滚动每个页面的值
</pre>
<a href="http://www.cjarvan.cn/pageScroll/pageScroll.html">效果预览</a>
<hr/>
<h4>drap(拖拽)</h4>
<p>使用方式</p>
<pre>
	<script src="../js/jquery-3.3.1.min.js"></script>
	 <script src="./drap.js"></script>
	<script type="text/javascript">	
		$(".dragsort").drag({
                clearance:10, //间隔
                animateSpeed:300,
         	});
	</script>
	参数解析
	clearance:10,   元素与元素间隔
    column:3,       元素每行的列数
    liswidth:100,   子元素下的宽
    lisheight:80,   子元素下的高
    animateSpeed: 3000,  交换执行时间
</pre>
<a href="http://www.cjarvan.cn/drap/drap.html">效果预览</a>
<hr/>
<h4>enlarge(放大镜)</h4>
<p>使用方式</p>
<pre>
	<script src="../js/jquery-3.3.1.min.js"></script>
	 <script src="./enlarge.js"></script>
	<script type="text/javascript">	
		$(function(){
			$('.enlarge').enlarge()
		})
	</script>
	参数解析
		// 阴影
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
</pre>
<a href="http://www.cjarvan.cn/enlarge/enlarge.html">效果预览</a>
<hr/>
<h4>tab(弹幕滚动)</h4>
<p>使用方式</p>
<pre>
	<script src="../js/jquery-3.3.1.min.js"></script>
	 <script src="./tab.js"></script>
	<script type="text/javascript">	
		$(function(){
			 $(".js-tab").tab();
		})
	</script>
	参数解析
    active:"active", //选项卡选定属性
    tabNav:".tab-nav>li", //选项卡导航元素
    tabContent:".tab-content>div", //选项卡内容元素
    eventType:"click" //选项卡事件
</pre>
<a href="http://www.cjarvan.cn/tab/tab.html">效果预览</a>
<hr/>
<h1>blog(个人博客)</h1>
<H4>图片预览</ h的>
<img src="http://www.cjarvan.cn/Cimages/blog-web.png"><hr/>
<img src="http://www.cjarvan.cn/Cimages/blog-web1.png"><hr/>
<img src="http://www.cjarvan.cn/Cimages/blog-manage1.png"><hr/>
<img src="http://www.cjarvan.cn/Cimages/blog-manage2.png"><hr/>
<img src="http://www.cjarvan.cn/Cimages/blog-code.png"><hr/>
<img src="http://www.cjarvan.cn/Cimages/comment.png">

