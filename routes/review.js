const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js"); // small 'e' for consistency
const Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { validateReview, isReviewAuthor, isLoggedIn } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Post review route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete review route
router.delete(
    "/:reviewId",
    isLoggedIn,
    isReviewAuthor,
    wrapAsync(reviewController.destroyReview)
);

module.exports = router;
