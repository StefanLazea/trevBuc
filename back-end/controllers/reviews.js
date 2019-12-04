const Reviews = require('../models').reviews;

const getAllReviews = async (req, res) => {

    let reviewsFound;
    try{
    await Reviews.findAll().then((allReviews) => reviewsFound = allReviews);
   }
   catch(err)
   {
       return res.status(409).send({ message: "No elements found in the database" });
   }
    

    res.send(reviewsFound);
};

module.exports = {
    getAllReviews
}