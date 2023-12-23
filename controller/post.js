const { profile } = require('console')
const db = require('../config/db.js')
const post = {
    CreatePost: (req, res) => {
        db.query('INSERT INTO post SET ?', {
            email: req.body.email,
            postdata: req.query.postdata,
            likeno: 0
        }, (err, result) => {
            if (err) {
                console.log(err)
                res.json({
                    status: 500,
                    message: 'server error'
                })
            } else {
                console.log(result)
                res.json({
                    status: 200,
                    message: 'post has created successfully'
                })
            }
        })
    },
    UpdatePost: (req, res) => {
        db.query('UPDATE post SET postdata=? WHERE email=? AND postid=?', [req.query.postdata, req.query.email, req.query.postid], (err, result) => {
            if (err) {
                console.log(err)
                res.json({
                    status: 500,
                    message: 'server error'
                })
            } else {
                console.log(result)
                res.json({
                    status: 200,
                    message: 'post has updated successfully'
                })
            }
        })
    },
    ShowPost: (req, res) => {
        db.query('SELECT * FROM post WHERE email=?', [req.body.email], (err, result) => {
            if (err) {
                console.log(err)
                res.json({
                    status: 400,
                    message: "Not found"
                })
            } else {

                db.query('SELECT name FROM auth WHERE email=?', [req.body.email], (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: 200,
                            name: data[0].name,
                            data: result
                        })
                    }
                })
            }
        })
    },

    showallpost: (req, res) => {
        db.query('SELECT * FROM post', (err, result) => {
            if (err) {
                console.log(err)
            } else {
                db.query('SELECT name FROM auth WHERE email=?', [req.body.email], (err, data) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.json({
                            status: 200,
                            name: data[0].name,
                            data: result
                        })
                    }
                })

            }
        })
    },

    DeletePost: (req, res) => {
        db.query('DELETE FROM post WHERE email=? AND postid=?', [req.query.email, req.query.postid], (err, result) => {
            if (err) {
                console.log(err),
                    res.json({
                        status: 400,
                        message: 'chutiya bnaya tumko'
                    })
            } else {
                res.json({
                    status: 200,
                    message: `post ${req.query.postid} has deleted`
                })
            }
        })
    }

}

module.exports = post;