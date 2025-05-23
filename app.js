const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

 //connection mongodb
const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
main().then(() => {
    console.log("connected to db");
})
.catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));

app.get("/", (req,res) => {
    res.send("Hi i am route");
})

//index route
app.get("/listings",async (req,res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", {allListings});
}
);

//New route
app.get("/listings/new", (req, res) => {
    res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id", async (req, res) => {
    let {id} = req.params;
    // id = id.trim(); // <- Yeh line important hai!
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", {listing});
});

//Create Route
app.post("/listings",async (req,res) => {
    if(req.body.listing.image){     
        let imageUrl=req.body.listing.image;
        req.body.listing.image={
            filename:"listingimage",
            url:imageUrl,
        }   
    }
    const newListing = new Listing(req.body.listing);
    let result=await newListing.save();
    res.redirect("/listings");  
});

//Edit Route
app.get("/listings/:id/edit", async (req, res) => {
    let {id} = req.params;
    // id = id.trim(); // <- Yeh line important hai!
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", {listing});
});

// //await Listing.findByIdAndUpdate(id, { ...req.body.listing });Update Route
// app.put("/listings/:id", async(req, res) => {
//     let {id} = req.params;
//     await Listing.findByIdAndUpdate(id, {...req.body.listing.image});
//     res.redirect("/listings");
// });

app.put("/listings/:id", async (req, res) => {
    const { id } = req.params;
   
    await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { runValidators: true });
    res.redirect(`/listings/${id}`);
});


//Delete Route
app.delete("/listings/:id", async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
})



// app.get("/testlisting", async (req, res) => {
//     let sampleListing = new Listing({
//         title: "My New Vila",
//         description: "By The Beach",
//         image: "https://source.unsplash.com/800x600/?villa",
//         price: 1200,
//         location: "Calangute, Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample wa saved");
//     res.send("succesfull testing");
// });

app.listen(8080, () => {
    console.log("server is listenig on port");
});