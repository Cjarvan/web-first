/*
* @Author: Administrator
* @Date:   2018-07-31 09:54:34
* @Last Modified by:   Administrator
* @Last Modified time: 2018-08-01 19:12:23
*/
 var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
 	username:String,
 	password:String,
 	isAdmin:{
 		type:Boolean,
 		default:false
 	}
 })