/*
* @Author: Administrator
* @Date:   2018-08-01 12:27:41
* @Last Modified by:   Cjarvan
* @Last Modified time: 2018-08-22 16:07:47
*/
 var express = require('express');
 var router = express.Router();
 var Category = require('../models/Category');
 var Content = require('../models/Content');
 var Comment = require('../models/Comment');
// 通用数据
var data;
router.use(function(req,res,next){
	data={
		userinfo :req.userinfo,
		category:[],
		// comment:[]
	}
	Category.find().then(function(category){
		data.category = category
		next()
	})
	// Comment.find().then(function(comment){
	// 	data.comment = comment
	// 	next()
	// })
})

 router.get('/',function(req,res,next){
 		data.limit=3
 		// category:[],
 		data.categorys=req.query.category ||''
 		data.page=Number(req.query.page || 1)
 		// userInfo: req.userinfo,
 		data.count=0
 	var where ={}
 	if(data.categorys){
 		where.category =data.categorys
 	}
 		Content.where(where).countDocuments().then(function(count){
 		data.count = count
 		data.pages = Math.ceil(data.count/data.limit)
 		data.page = Math.min(data.page,data.pages)
 		data.page = Math.max(data.page,1)
 		var skip = (data.page -1)*data.limit
 		data.urlpre = `/?category=${data.categorys}&page=${data.page-1}`
 		data.urlnext = `/?category=${data.categorys}&page=${data.page+1}`
		return Content.where(where).find().limit(data.limit).skip(skip).populate(['category','users']).sort({
			addTime:-1
		})
 	}).then(function(cate){
 		data.cate =cate
 		res.render('main/index',data)
 	})  
 })
 	router.get('/views',function(req,res,next){
 	var cates = req.query.id||''
 	data.urlpre = `/?category=${data.categorys}&page=${data.page-1}`
 	data.urlnext = `/?category=${data.categorys}&page=${data.page+1}`
Content.findOne({_id:cates}).then(function(content){
    console.log(content)
	data.content = content
	data.limit = 6
	data.page=Number(req.query.page || 1)
	data.count = content.comments.length 
 	data.pages = Math.ceil(data.count/data.limit)
 	data.page = Math.min(data.page,data.pages)
 	data.page = Math.max(data.page,1)
 	if(content){
 		content.read++
 		content.save()
 		res.render('main/index-content',data)
 			}
 		})
	})
 module.exports = router;