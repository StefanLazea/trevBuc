const Reviews = require('../models').Reviews;
const TransportTypes = require('../models').transportType;

const createReview = async (req, res) => {
    await Reviews.create({
        leaving_point: req.body.leaving_point,
        arriving_point: req.body.arriving_point,
        leaving_hour: req.body.leaving_hour,
        duration: req.body.duration,
        observations: req.body.observations,
        rating: req.body.rating,
        congestion_level: req.body.congestion_level,
        userId: req.body.userId,
        transportTypeId: req.body.transportTypeId
    }).then(result => res.send(result))
}

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

const updateReview = async (req, res) => {
    await Reviews.update({
        leaving_point: req.body.leaving_point,
        arriving_point: req.body.arriving_point,
        leaving_hour: req.body.leaving_hour,
        duration: req.body.duration,
        observations: req.body.observations,
        rating: req.body.rating,
        congestion_level: req.body.congestion_level,
        userId: req.body.userId,
        transportTypeId: req.body.transportTypeId
    },
        {
            where:
                { id: req.params.id }
        }
    ).then(updatedReview => res.send(updatedReview));

}

const getReviewByTransportType = async (req, res) => {
    let foundTransportTypeId;
    await TransportTypes.findOne(
        {
            where: { type: req.params.type }
        }
    ).then((result) => foundTransportTypeId = result.id);

    await Reviews.findAll(
        {
            where: { transportTypeId: foundTransportTypeId }
        }).then(result => res.send(result));
}

module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    getReviewByTransportType
}