var mongoose = require('mongoose')
var usersSchema = require('../schemas/comment');
module.exports = mongoose.model('Comment',usersSchema)