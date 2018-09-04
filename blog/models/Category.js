/*
* @Author: Administrator
* @Date:   2018-08-02 15:24:23
* @Last Modified by:   Administrator
* @Last Modified time: 2018-08-02 15:37:46
*/
var mongoose = require('mongoose');
var usersSchema = require('../schemas/category');
module.exports = mongoose.model('Category',usersSchema)