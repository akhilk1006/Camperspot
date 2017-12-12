var express          = require("express"),
    app              = express(),
    bodyParser       = require("body-parser"), 
    mongoose         = require("mongoose"),
    passport         = require("passport"),
    LocalStrategy    = require("passport-local"),
    campground       = require("./models/campground.js"),
    User             = require("./models/user.js"),
    seedDB           = require("./seed.js"),
    Comment          = require("./models/comments.js"),
    methodOverride   = require("method-override"),
    flash            = require("connect-flash"),
    commentRoutes    = require("./routes/comments.js"),
    campgroundRoutes = require("./routes/campgrounds.js"),
    authRoutes       = require("./routes/auth.js")

mongoose.connect("mongodb://localhost/Camperspot",{useMongoClient:true})
// mongoose.connect("mongodb://akhil:akhil@ds123956.mlab.com:23956/camperspot",{useMongoClient:true})
mongodb://akhil:akhil@ds123956.mlab.com:23956/camperspot
app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(__dirname+"/public"))
app.use(require("express-session")({
	secret: "some secret",
	resave: false,
	saveUninitialized :false
}))
app.use(flash())
app.use(methodOverride("_method"))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(function(req, res, next){
	res.locals.currentUser = req.user
	res.locals.error = req.flash("error")
	res.locals.success = req.flash("success")
	next()
})
app.use(campgroundRoutes)
app.use(commentRoutes)
app.use(authRoutes)
app.listen(3000, function(){
    console.log("Camper app started successfully")
})