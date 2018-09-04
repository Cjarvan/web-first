/*
* @Author: Administrator
* @Date:   2018-08-03 14:14:57
* @Last Modified by:   Cjarvan
* @Last Modified time: 2018-08-22 16:07:46
*/
var mongoose = require('mongoose');
module.exports = new mongoose.Schema({
	category:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Category'
	},
	comment:{
		type:mongoose.Schema.Types.ObjectId,
		ref:'Comment'
	},
	addTime:{
		type:Date,
		default: new Date()
	},
	read:{
		type:Number,
		default: 0
	},
	title:String,
	describe:String,
	content:String,
	comments:{
		type:Array,
		default:[]
	}
 })