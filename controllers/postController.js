const Post = require('../models/post');
const {body, validationResult} = require("express-validator");

exports.create_get = function (req, res, next) {
    res.render('post_form', {
        title: "Post Form"
    })
}

exports.create_post = [
    body("post", "Post must not be empty")
    .trim()
    .isLength({min:10})
    .escape(),
    
    (req, res, next) => {
        const errors = validationResult(req);
        console.log("innnn " + errors.array())
        console.log(req.user)
        const newPost = new Post({
            post: req.body.post,
            title: req.body.title,
            postedBy: req.user
        });

        if(!errors.isEmpty()){
            res.render('post_form', {
                postTitle: req.body.title,
                post: req.body.post,
                errors: errors.array()
            })
            return;
        }
        newPost.save()
          .then(savedPost => {
            console.log(savedPost + " saved succesfully.")
            res.redirect(savedPost.url)
          })
          .catch(err => {
            console.log("Error occured during saving :" + err)
            return next(err);
          })

    }
];

exports.post_detail_get = function (req, res, next) {
    Post.findById(req.params.id)
      .populate('postedBy')
      .then( post => {
        res.render('post_detail', {
            title: post.title,
            post: post.post,
            postedBy: post.postedBy.username,
            postDate: post.postDate,
            user: req.user
        })
      }).catch( err => {
        console.log("error in getting post detail: " + err)
        return next(err);
      })
}

