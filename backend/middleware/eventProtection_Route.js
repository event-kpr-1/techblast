import Event from "../model/NewEventModel.js";

const eventProtection = async(req, res, next) => {
    const {evid} = req.params;
    const get = req.query.get;
    if(evid.length !== 24){
        return res.status(404).json({error : 'length event found'})
    }
    
    const event = await Event.findOne({_id : evid})
    if(!event){
        
        return res.status(404).json({error : 'no event found'})
    }
    // console.log('middleware ok');
    (get === '1') && (req.event = event);
    next();
}

export default eventProtection;