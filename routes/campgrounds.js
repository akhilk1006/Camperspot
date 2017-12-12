var express = require("express")
var router = express.Router()
var campground = require("../models/campground")
var middleware = require("../middleware")
router.get("/campgrounds", function(req, res){
        campground.find({}, function(err, allcampgrounds){
            if(err) console.log(err)
            else res.render("campgrounds/index",{campgrounds: allcampgrounds})
        })
})

router.post("/campgrounds",middleware.isLoggedIn, function(req, res){
      var name = req.body.name
      var price = req.body.price
      var image = req.body.image
      var description = req.body.description
      var author = {
        id: req.user._id,
        username: req.user.username
      }
      var newCampground = {name : name, price: price, image : image, description: description, author: author}
      campground.create(newCampground, function(err, camp_ground){
          if(err)console.log(err)
          else res.redirect("/campgrounds")
      })
})
router.get("/campgrounds/:id/edit" ,middleware.checkCampgroundOwnership , function(req, res){
      campground.findById(req.params.id, function(err, foundCampground){
        if(err || !foundCampground){
          req.flash("error","Campground not found")
          res.redirect("/campgrounds")
        }
        res.render("campgrounds/edit",{campground: foundCampground})
      })
})
router.get("/campgrounds/new",middleware.isLoggedIn, function(req, res){
    res.render("campgrounds/new.ejs")
})
router.get("/campgrounds/:id",function(req, res){
    campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
           req.flash("error", "Sorry, that campground does not exist")
           return res.redirect("/campgrounds")
        }
        else { 
            res.render("campgrounds/show",{campground: foundCampground}) 
        }
    })
})
router.put("/campgrounds/:id",middleware.checkCampgroundOwnership ,function(req, res){
    campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
      if(err){
        res.redirect("/campgrounds")
      } else {
        res.redirect("/campgrounds/"+req.params.id)
      }
    })
})
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership ,function(req, res){
  campground.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/campgrounds")
    } else {
      res.redirect("/campgrounds")
    }
  })
})
module.exports = router