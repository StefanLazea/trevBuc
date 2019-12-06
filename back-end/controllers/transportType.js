const TransportType = require('../models').transportType;

const createTransportType = async (req,res) =>{
    await TransportType.create({
        name: req.body.name,
        type: req.body.type
    }). then(result => res.send(result));
}

const getAllTransportTypes = async (req, res) => {

    let transportTypesFound;
    try {
        await TransportType.findAll().then((allTransportTypes) => transportTypesFound = allTransportTypes);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }


    res.send(transportTypesFound);
};

module.exports = {
    getAllTransportTypes,createTransportType
}