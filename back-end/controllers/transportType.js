const TransportType = require('../models').transportType;

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
    getAllTransportTypes
}