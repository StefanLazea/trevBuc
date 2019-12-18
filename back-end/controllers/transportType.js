const TransportType = require('../models').transportType;
//const { findUserByUsername } = require('../services/users');

const createTransportType = async (req, res) => {
    await TransportType.create({
        name: req.body.name,
        type: req.body.type
    }).then(result => res.send(result));
}

const getAllTransportTypes = async (req, res) => {

    let transportTypesFound;
    try {
        await TransportType.findAll()
            .then((allTransportTypes) => transportTypesFound = allTransportTypes);
    }
    catch (err) {
        return res.status(409).send({ message: "No elements found in the database" });
    }

    res.send(transportTypesFound);
};


const getAllTranportTypesByType = async (req, res) => {
    let namesTransportTypes;
    try {
        await TransportType.findAll({
            where: {
                type: req.params.type
            }
        }).then((tansportTypebyType) => namesTransportTypes = tansportTypebyType);
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" + namesTransportTypes });
    }
    res.send(namesTransportTypes);
}


const getTranportTypeById = async (req, res) => {
    let transportTypes;
    try {
        await TransportType.findOne({
            where: {
                id: req.params.id
            }
        }).then((tansportTypeById) => transportTypes = tansportTypeById);
    }
    catch (err) {
        return res.status(404).send({ message: "Not found" });
    }
    res.send(transportTypes);
}


module.exports = {
    getAllTransportTypes,
    createTransportType,
    getAllTranportTypesByType,
    getTranportTypeById
}