const TransportType = require('../models').transportType;
const { findUserByUsername } = require('../services/users');

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

const getAllTranportTypesByType = async(req,resp)=>{
    let namesTransportTypes;
    try{
        await TransportType.findAll({
         where: {
         type: req.param.type}
        }).then((TansportTypebyType) => namesTransportTypes = TansportTypebyType);
    }
  catch(err) {
            return resp.status( 404).send({ message: "NOT FOUND" });
        }
        resp.send(namesTransportTypes);
}
    
const getTranportTypesById = async(req,resp)=>{
    let TransprtTypes;
    try{
        await TransportType.findAll({
         where: {
         type: req.params.id}
        }).then((TansportTypebyType) => TransprtTypes = TansportTypebyType);
    }
  catch(err) {
            return resp.status( 404).send({ message: "NOT FOUND" });
        }
        resp.send(TransprtTypes);
}


module.exports = {

    getAllTransportTypes,
    createTransportType,
    getAllTranportTypesByType,
    getTranportTypesById
}