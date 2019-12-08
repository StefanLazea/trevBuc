const TransportType = require('../models').transportType;
const { findUserByUsername } = require('../services/users');

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

const getAllTranportTypesByType = async (req, resp) => {
    let namesTransportTypes;
    try {
        await TransportType.findAll({
            where: {
                type: req.param.type
            }
        }).then((tansportTypebyType) => namesTransportTypes = tansportTypebyType);
    }
    catch (err) {
        return resp.status(404).send({ message: "Not found" });
    }
    resp.send(namesTransportTypes);
}

const getTranportTypesById = async (req, resp) => {
    let transprtTypes;
    try {
        await transprtTypes.findAll({
            where: {
                type: req.params.id
            }
        }).then((tansportTypebyType) => transprtTypes = tansportTypebyType);
    }
    catch (err) {
        return resp.status(404).send({ message: "Not found" });
    }
    resp.send(transprtTypes);
}


module.exports = {

    getAllTransportTypes,
    createTransportType,
    getAllTranportTypesByType,
    getTranportTypesById
}