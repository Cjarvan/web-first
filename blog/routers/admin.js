/*
* @Author: Administrator
* @Date:   2018-07-31 13:58:30
* @Last Modified by:   Cjarvan
* @Last Modified time: 2018-08-21 15:31:18
*/
 var express = require('express');
 var router = express.Router();
 var Category = require('../models/Category');
 var User = require('../models/User');
 var Content = require('../models/Content');
 // 跳转后台管理首页
 router.get('/',function(req,res,next){
 	res.render('admin/manage',{
 		userinfo:req.userinfo
		})
 	})
 // 跳转用户信息页面
router.get('/user',function(req,res,next){
 		var page = Number(req.query.page || 1);
 		// var urlpre ='/admin/user?page={{page-1}}'
 		// var urlnext ='/admin/user?page={{page+1}}'
 	var limit = 10;
 	User.countDocuments().then(function(count){
 		pages = Math.ceil(count/limit)
 		page = Math.min(page,pages)
 		page = Math.max(page,1)
 		var skip = (page -1)*limit
 		var urlpre =`/admin/user?page=${page-1}`
 		var urlnext = `/admin/user?page=${page+1}`
 		User.find().limit(limit).skip(skip).then(function(user){
 		res.render('admin/user-manage',{
 			userinfo:req.userinfo,
 			user:user,
 			page:page,
 			pages:pages,
 			urlpre:urlpre,
 			urlnext:urlnext
 			})
 		})
 	})
})
	// 跳转分类类别首页
 	router.get('/classification',function(req,res,next){
 			var page = Number(req.query.page || 1);
 			var limit = 10;
 	Category.countDocuments().then(function(count){
 		pages = Math.ceil(count/limit)
 		page = Math.min(page,pages)
 		page = Math.max(page,1)
 		var skip = (page -1)*limit
 		var urlpre =`/admin/classification?page=${page-1}`
 			var urlnext = `/admin/classification?page=${page+1}`
 		Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function(cate){
 		res.render('admin/user-classification',{
 			userinfo:req.userinfo,
 			cate:cate,
 			page:page,
 			pages:pages,
 			urlpre:urlpre,
 			urlnext:urlnext
 			})
 		})
 	})
 })
 	// 添加分类类别点击post
 	router.post('/category/add',function(req,res,next){
 		var category = req.body.category||''
 		var reqData = ''
 			if(category ==''){
	 			reqData = '分类名不能为空'
	 			res.render('admin/category-add',{
	 			userinfo:req.userinfo,
	 			reqData:reqData
	 		})
 			return;
 		}
 		Category.findOne({category:category}).then(function(cate){
 		 	if(cate){
 		 		reqData = '分类名已存在'
 		 		res.render('admin/category-add',{
 					userinfo:req.userinfo,
 					reqData:reqData
 				})
 		 		return;
 		 	}
 		 	var categorys = new Category({
 		 		category:category	
 		 	})
 		 	return categorys.save()
 		 	}).then(function(info){
 		 		if(info){
 		 		res.redirect('/admin/classification')
 		 	}
 		 }) 		
 	})
 	// 跳转添加分类类别页面
 	router.get('/category/add',function(req,res,next){
 		res.render('admin/category-add',{
 			userinfo:req.userinfo,
 		})
 	})
 	// 跳转修改分类类别页面
 	router.get('/classification/edit',function(req,res,next){
 		var editId = req.query.id||''
 		Category.findOne({
				_id:editId
			}).then(function(category){
				if(!category){
					console.log("分类名!!不存在")
					return Promise.reject()
				}else{
 			res.render('admin/edit',{
 				userinfo:req.userinfo,
 				category:category
 			})
 		}
 	})
})
 	// 修改分类类别点击post
 	router.post('/classification/edit',function(req,res,next){
			var editId = req.query.id||''
			 var editName =req.body.category||''
			Category.findOne({
				_id:editId
			}).then(function(cate){
				if(!cate){
					console.log("分类名不存在")
					return Promise.reject()
				}else{
					if(editName ==cate.category){
					console.log("分类名没改动")
					return Promise.reject()
				}else{
					return Category.findOne({
						_id:{$ne:editId},
						category:editName})
					}
				}
			}).then(function(samename){
				if(samename){
					// console.log(editName)
					console.log("数据库已经存在同名分类")
					return Promise.reject()
				}else{
					return Category.update(
						{_id:editId},
						{category:editName})
				}
			}).then(function(){
				res.redirect('/admin/classification')
			})
 		})
 	// 删除分类类别
 	router.get('/classification/delete',function(req,res,next){
 		var editId = req.query.id||''
 		Category.remove({
				_id:editId
			}).then(function(cate){
				res.redirect('/admin/classification')	
			})
 		})
 	// 跳转分类内容页面
 	router.get('/classification/content',function(req,res,next){
 		var page = Number(req.query.page || 1);
 			var limit = 6;
 	Content.countDocuments().then(function(count){
 		pages = Math.ceil(count/limit)
 		page = Math.min(page,pages)
 		page = Math.max(page,1)
 		var skip = (page -1)*limit
 		var urlpre =`/admin/classification/content?page=${page-1}`
 		var urlnext = `/admin/classification/content?page=${page+1}`
 		Content.find().sort({_id:-1}).limit(limit).skip(skip).then(function(contentcate){
 		res.render('admin/save-content',{
 			userinfo:req.userinfo,
 			contentcate:contentcate,
 			page:page,
 			pages:pages,
 			urlpre:urlpre,
 			urlnext:urlnext
 				})
 			})
 		})
 	})	
 	// 点击详细跳转分类具体的内容
 	router.get('/classification/content/specific',function(req,res,next){
 		var editId = req.query.id||''
 		Content.findOne({_id:editId}).populate('category').then(function(specific){
 			res.render('admin/specific',{
 				userinfo:req.userinfo,
 				specific:specific
 			})
 		})
 	})
 	// 跳转添加分类内容页面
 	router.get('/classification/add',function(req,res,next){
 		Category.find().then(function(addcate){
 			res.render('admin/user-content',{
 				userinfo:req.userinfo,
 				addcate:addcate,
 			})
 		})	
 	}) 
 	// 添加分类内容点击post
 	router.post('/classification/add',function(req,res,next){
 		var reqContent =''
 		if(req.body.title==''||req.body.describe==''||req.body.content==''){
 				reqContent = '标题,描述或者内容不能为空'
 		Category.find().then(function(addcate){
 			res.render('admin/user-content',{
 				userinfo:req.userinfo,
 				addcate:addcate,
 				reqContent:reqContent
 			}) 
 		})
 		return;
 		}
 		var contents = new Content({
 			title:req.body.title,
 			category:req.body.category,
 			describe:req.body.describe,
 			content:req.body.content
 		})
 		Content.findOne({
 			title:contents.title,
 			category:contents.category,
 			describe:contents.describe
 		}).then(function(same){
 			if(same){
 				reqContent = '数据库已存在相类似的内容'
 				Category.find().then(function(addcate){
 			res.render('admin/user-content',{
 				userinfo:req.userinfo,
 				addcate:addcate,
 				reqContent:reqContent
 			})
 		})	
 				return Promise.reject()
 			}else{
 				contents.save()
 				res.redirect('/admin/classification/content')
 			}
 		})
 	})
 	// 跳转修改分类内容页面
 	router.get('/content/edit',function(req,res,next){
 		 var addcate =[]
 		 Category.find().then(function(addcate){
 			var editId = req.query.id||''
			addcate = addcate
 		return	Content.findOne({_id:editId}).populate('category').sort({addTime:-1}).then(function(cate){
 				if(!cate){
 					console.log('不存在')
 					return Promise.reject()
 				}else{
 				res.render('admin/content-edit',{
 					userinfo:req.userinfo,
 					cate:cate,
 					addcate:addcate
 					})
 				}
 			})
 		})
 	})
 	// 修改分类内容点击post
 	router.post('/content/edit',function(req,res,next){
 			var editId = req.query.id||''
 			       	Content.update({
 			       		_id:editId
 			       	},{
 			       		title:req.body.title,
 			       		category:req.body.category,
 						describe:req.body.describe,
 						content:req.body.content
 			       	}).then(function(){
 			       		res.redirect('/admin/classification/content')
 			    	})
 				})
 	// 删除分类内容
 	router.get('/content/delete',function(req,res,next){
 		var editId = req.query.id||''
 		Content.remove({
				_id:editId
			}).then(function(){
				res.redirect('/admin/classification/content')
 	})
})
 module.exports = router