const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");
const session=require("express-session");
const passport=require("passport");
const Admin=require("./models/adminschema");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(session({
    secret:"our little secret Key",
    resace:false,
    saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
// routes
const userroutes=require("./routes/user");
const adminroutes=require("./routes/admin")
// connecting mongoose
mongoose.connect("mongodb://localhost:27017/LibraryDB",{   useNewUrlParser: true,
useUnifiedTopology: true})
.then(() => console.log("Mongodb is connected"))
.catch((err) => console.log(err));

passport.use(Admin.createStrategy());
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

app.get("/",(req,res) => {
    res.render("home");
})

app.use(userroutes);
app.use(adminroutes);

app.listen(3000,() => {
    console.log("Server Started");
})