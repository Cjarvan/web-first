/*
* @Author: Administrator
* @Date:   2018-07-31 22:01:11
* @Last Modified by:   Administrator
* @Last Modified time: 2018-07-31 22:11:34
*/
var mongoose = require('mongoose');
var usersSchema = require('../schemas/users');
module.exports = mongoose.model('User',usersSchema)