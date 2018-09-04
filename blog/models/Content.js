/*
* @Author: Administrator
* @Date:   2018-08-03 14:13:23
* @Last Modified by:   Administrator
* @Last Modified time: 2018-08-03 14:25:15
*/
var mongoose = require('mongoose');
var usersSchema = require('../schemas/content');
module.exports = mongoose.model('Content',usersSchema)