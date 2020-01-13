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
    }).then(result => {res.send(result);
        res.status(201).send({message:"Review created"})}
        )
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
    ).then(res.status(201).send({message:"The review with the id '" + req.params.id + "' has been updated"}));

}


const getReviewsByTransportTypeId = async (req, res) => {
    let foundTransportTypeId;
    try{
    await TransportTypes.findOne(
        {
            where: { id: req.params.id }
        }
    ).then((result) => foundTransportTypeId = result.id);

    await Reviews.findAll(
        {
            where: { transportTypeId: foundTransportTypeId }
        }).then(result => res.send(result));
    }
    catch(err)
    {
        return res.status(404).send({ message: "No elements found in the database" });
    }
}


const deleteReviewById = async(req, res) => {
    await Reviews.destroy(
        {
            where: { id: req.params.id }
        }).then(res.status(201).send({message:"Review deleted"}))
}

const getReviewById = async(req, res) => {
    try{
    await Reviews.findOne(
        {
            where: { id: req.params.id }
        }).then(result => res.send(result));
    }
    
    catch(err) {
            return res.status(404).send({ message: "NOT FOUND" });
        }
}


module.exports = {
    createReview,
    getAllReviews,
    updateReview,
    getReviewsByTransportTypeId,
    deleteReviewById,
    getReviewById
}