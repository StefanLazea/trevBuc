const Reviews = require('../models').Reviews;

const getAllReviews = async (req, res) => {

    let reviewsFound;
    try {
        await Reviews.findAll().then((allReviews) => reviewsFound = allReviews);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }
    return res.send(reviewsFound);
};

const updateReview = async (req,res) => {
   
   await Reviews.update( {leaving_point: req.body.leaving_point,
        arriving_point: req.body.arriving_point,
        leaving_hour: req.body.leaving_hour,
        duration: req.body.duration,
        observations: req.body.observations,
        rating: req.body.rating,
        congestion_level: req.body.congestion_level
    },{where: {id: req.params.id}}).then(updatedReview => res.send(updatedReview));
    
}

module.exports = {
    getAllReviews,
    updateReview
}