const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        filename: String,
        url: {
            type: String,
            default: "https://unsplash.com/photos/sunrise-illuminates-a-beautiful-lake-and-snowy-mountains-8Jbo0T-DxUI",
            set: (v) => 
                v === ""
                ? "https://unsplash.com/photos/sunrise-illuminates-a-beautiful-lake-and-snowy-mountains-8Jbo0T-DxUI"
                : v,
        }
    },
    price: Number,
    location: String,
    country: String
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
