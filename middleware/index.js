var campground = require("../models/campground")
var Comment = require("../models/comments")
var middlewareObj = {}
middlewareObj.checkCampgroundOwnership =  function(req, res, next){
   if(req.isAuthenticated()){
       campground.findById(req.params.id, function(err , foundCampground){
       if(err || !foundCampground){
       	  req.flash("error","campground not found")
          res.redirect("/campgrounds")
       } else {
           if(foundCampground.author.id.equals(req.user.id)){
                next()
           } else {
           	    req.flash("error","You don't have permission to do that")
                res.redirect("back")
           }     
         }
		      })
  } else {
  	req.flash("error","You need to be logged in to do that")
    res.redirect("back")
  }
}

middlewareObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
         Comment.findById(req.params.comments_id, function(err, foundComment){
            if(err || !foundComment){
                res.redirect("back")
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                    next()
                } else {
                	req.flash("error", "You don't have permission to do that")
                    res.redirect("back")
                }
            }
         })
    } else {
    	req.flash("error","You should be logged in to do that")
        res.redirect("back")
    }
}
middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash("error","You need to be logged in to do that")
    res.redirect("/login")
}
module.exports = middlewareObj