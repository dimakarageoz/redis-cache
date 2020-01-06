const Blog = require('../models/blog');

exports.createBlog = function (req, res) {
    const { title, content } = req;

    if (!title) {
        return res.send(400).json({
            message: 'Title is required field'
        });
    }

    Blog.create({
        title,
        content,
        author: req.user.id
    })
        .then(() => res.sendStatus(200))
        .catch((err) => {
            res.send(500).json({
                message: err.message
            })
        })
    ;
};