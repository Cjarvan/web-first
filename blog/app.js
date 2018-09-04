/*
* @Author: Administrator
* @Date:   2018-07-30 21:20:08
* @Last Modified by:   Cjarvan
* @Last Modified time: 2018-09-04 14:04:16
*/

var express = require('express');
var mongoose = require('mongoose');
// 加载模板处理模块
var	swig = require('swig');
// 加载body-parser，用来处理post提交过来的数据
var bodyParser = require('body-parser');
var Cookies = require('cookies');
var User = require('./models/User');
// 创建app应用 => nodejs http.createServer()
var app = express();
// 设置静态文件托管
app.use('/public',express.static(__dirname+'/public'));
app.use(function(req,res,next){
	req.cookies = new Cookies(req,res)
	req.userinfo ={};
	// console.log(req.cookies.get('userinfo'))
	if(req.cookies.get('userinfo')){
		try{
			req.userinfo = JSON.parse(req.cookies.get('userinfo'));
			User.findById(req.userinfo._id).then(function(userInfo){
				// console.log(userInfo)
				req.userinfo.isAdmin =Boolean(userInfo.isAdmin);
				next();
			})
		}catch(e){req.cookies.set('userinfo',JSON.stringify(responseDate.UserInfo))
		 	res.json(responseDate);
			next();
		}
	}else{
	next();
}
})
// 定义当前应用所使用的模板引擎
app.engine('html',swig.renderFile);
// 设置模板存放的目录
app.set('views','./views');
//注册所使用的模板引擎
app.set('view engine','html');
// 取消模板缓存
swig.setDefaults({cache:false});
// body-parser配置
app.use(bodyParser.urlencoded({extended:true}));
app.use('/admin',require('./routers/admin'))
app.use('/api',require('./routers/api'))
app.use('/',require('./routers/main'))
// 连接数据库
mongoose.connect('mongodb://localhost:27018/blog',function(err){
	if(err){
		console.log('连接失败');
	}else{
	console.log('连接成功');
	app.listen(8081);
	}
})

