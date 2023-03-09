const mongoose = require('mongoose');

const schema = mongoose.Schema

const postSchema = new schema({
    title: {type: String, required: true},
    postedBy: {type: schema.Types.ObjectId, ref: 'User', required: true},
    postDate: {type: Date, default: new Date()},
    post: {type: String, maxLength: 300}
})

postSchema.virtual('url').get(function(){
    return `post/${this._id}`
})

module.exports = mongoose.model('Post', postSchema);