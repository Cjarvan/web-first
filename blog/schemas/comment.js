/*
* @Author: Cjarvan
* @Date:   2018-08-21 16:01:42
* @Last Modified by:   Cjarvan
* @Last Modified time: 2018-08-22 16:07:45
*/
var mongoose = require('mongoose')
module.exports = new mongoose.Schema({
	comments:{
		type:Array,
		default:[]
	}
	// childs:{
	// 	type:Array,
	// 	default:[]
	// }
})