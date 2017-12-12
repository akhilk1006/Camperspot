var express = require("express")
var router = express.Router()
var campground = require("../models/campground")
var Comment    = require("../models/comments")
var middleware = require("../middleware")
router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn, function(req, res){
    campground.findById(req.params.id,function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            res.render("comments/new",{campground : foundCampground})
        }
    })
    
})
router.post("/campgrounds/:id/comments",middleware.isLoggedIn, function(req, res){
    campground.findById(req.params.id, function(err, foundCampground){
        if(err){
            console.log(err)
        } else {
            Comment.create(req.body.comments, function(err, comment){
                if(err){
                    req.flash("error","Something went wrong")
                    console.log(err)
                } else {
                    comment.author.id = req.user._id
                    comment.author.username = req.user.username
                    comment.save()
                    foundCampground.comments.push(comment)
                    foundCampground.save(function(err, saved_campground){
                    if(err){
                          console.log(err)
                    } else {
                         req.flash("success","Sucessfully added comment")
                         res.redirect("/campgrounds/"+saved_campground._id)
                        }
            })
                }
            })
            
        }
    })
})
router.get("/campgrounds/:id/comments/:comments_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comments_id, function(err, foundComment){
        if(err || !foundComment){
            req.flash("error","comment does not exist")
            res.redirect("back")
        } else {
            res.render("comments/edit",{campground_id: req.params.id, comment:foundComment})
        }
    })
})
router.put("/campgrounds/:id/comments/:comments_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comments_id, req.body.comments, function(err, updatedComment){
        if(err){
            res.redirect("back")
        } else {
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})
router.delete("/campgrounds/:id/comments/:comments_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comments_id, function(err){
        if(err){
            res.redirect("back")
        } else {
            req.flash("success","Comment deleted")
            res.redirect("/campgrounds/"+req.params.id)
        }
    })
})
module.exports = router