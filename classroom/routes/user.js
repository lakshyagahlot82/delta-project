const express = require("express");
const router = express.Router();

// index route 
router.get("/users", (req, res) => {
    res.send("GET for user");
});

//show route 
router.get("/users/:id", (req, res) =>{
    res.send("show for user");
})

//post route 
router.post("/users/:id", (req, res) =>{
    res.send("post for user");
})

module.exports = router;
