const TransportType = require('../models').transportType;
const { findUserByUsername } = require('../services/users');

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
         type: "Ratb"}
        }).then((TansportTypebyType) => namesTransportTypes = TansportTypebyType);
    }
  catch(err) {
            return resp.status( 404).send({ message: "NOT FOUND" });
        }
        resp.send(namesTransportTypes);
}
    


module.exports = {
    getAllTransportTypes,
    getAllTranportTypesByType
    
}