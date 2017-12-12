var mongoose = require("mongoose"),
    campground = require("./models/campground.js"),
    Comment = require("./models/comments.js")
var data = [{ 
              name: "Cloud's Rest",
              image: "https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg",
              description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
            },
            { 
              name: "Canyoon Floor",
              image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
              description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
            },
            { 
              name: "Dessert messa",
              image: "https://farm2.staticflickr.com/1363/1342367857_2fd12531e7.jpg",
              description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
            },
         ]  
function seedDB(){
    campground.remove({},function(err){
        if(err){
            console.log(err)
        } else {
                data.forEach(function(seed){
                    campground.create(seed, function(err,data){
                    if(err){
                        console.log(err)
                    } else {
                       Comment.create({
                           text: "this place is great but i wish there was internet",
                           author: "aditya narayan"
                       },function(err,comment){
                           if(err){
                               console.log(err)
                           }
                           else {
                               data.comments.push(comment)
                               data.save(function(err,saved_data){
                                   if(!err){
                                       console.log("created new data")
                                   }
                               })
                           }
                       })
                     }
                    })
                })
        }
    })
}
module.exports = seedDB
