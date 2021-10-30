const express=require("express");
const router=express.Router();

router.get("/userlogin",(req,res) => {
    res.render("user/userlogin");
});
router.get("/userregistration",(req,res) => {
    res.render("user/userregistration");
})

module.exports=router;