/*
* @Author: Administrator
* @Date:   2018-07-31 22:08:15
* @Last Modified by:   Cjarvan
* @Last Modified time: 2018-08-22 16:09:07
*/
var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Content = require('../models/Content')
var Comment = require('../models/Comment')
var responseDate;
router.use(function(req,res,next){
	responseDate = {
		code:0 ,
		message:''
	}
	next()
});
// 用户注册
router.post('/user/resgiter',function(req,res,next){
	var username =req.body.username;
	var password =req.body.password;
	var repassword =req.body.repassword;
	if(username ==''){
		responseDate.code = 1;
		responseDate.message ="用户名不能为空" ;
		res.json(responseDate);
		return ;
	}if(password ==''){
		responseDate.code = 2;
		responseDate.message ="密码不能为空";
		res.json(responseDate);
		return ;
	}if(password !=repassword){
		responseDate.code = 3;
		responseDate.message ="两次密码不同";
		res.json(responseDate);
		return ;
	}
	User.findOne({
		username:username
	}).then(function(userInfo){
		if(userInfo){
			responseDate.code = 4;
			responseDate.message ="用户名已经存在";
			res.json(responseDate);
			return ;
		}
		var user = new User({
			username:username,
			password:password
		})
		return user.save()
	}).then(function(newInfo){
		responseDate.message = "注册成功";
		res.json(responseDate);
	})
})
// 用户登录
router.post('/user/login',function(req,res,next){
	var username =req.body.username;
	var password =req.body.password;
	if(username == ''|| password == ''){
		responseDate.code = 1;
		responseDate.message = "用户名或密码不能为空";
		res.json(responseDate);
		return;
	}
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		if(!userInfo){
			responseDate.code = 2;
		 	responseDate.message = "用户名或密码错误";
		 	res.json(responseDate);
		 	return;
		}
			responseDate.code = 0;
			responseDate.message = "登陆成功";
			responseDate.UserInfo ={
				_id :userInfo._id,
				username:userInfo.username
			}
			req.cookies.set('userinfo',JSON.stringify(responseDate.UserInfo))
		 	res.json(responseDate);
		 	return;
	})
})
// 用户退出
router.get('/user/logout',function(req,res,next){
	req.cookies.set('userinfo',null)
		 	res.json(responseDate);
})

router.get('/comment',function(req,res,next){
	var contentId = req.query.contentid||''
	Content.findOne({_id:contentId}).then(function(content){
		// console.log(content)
		responseDate.data = content.comments
		res.json(responseDate)
	})
})
// 评论留言
router.post('/comments',function(req,res,next){
	var contentId = req.body.contentid
	var postData = {
		username:req.userinfo.username,
		postTime: new Date(),
		content:req.body.content
	}
	Content.findOne({_id:contentId}).then(function(content){
		if(postData.content===''){
			return Promise.reject()
		}
		content.comments.push(postData)
		return content.save()
	}).then(function(newcontent){
		responseDate.data=newcontent
		res.json(responseDate)
	})
})
	router.get('/delete',function(req,res,next){
	var contentId = req.body.contentid
	console.log(contentId)
	Content.find({_id:contentId}).then(function(content){
		res.redirect('/index-content')
	})
})
module.exports = router;