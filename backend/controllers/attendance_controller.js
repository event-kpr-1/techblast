
import Participant from "../model/techblast_model.js";
import Event from "../model/NewEventModel.js";
export const attended = async(req , res) => {
    try {
        const {event , id , evid} = req.params;
        
        const participant = (id.length===24) ? await Participant.findOne({_id : id}) : await Participant.findOne({regno : id})
        if(!participant || participant.eventID.toString() !== evid.toString()){
            return res.status(404).json({error : "participant not found"})
        }
        
        if(event === 'kit' || event === 'food' || event === 'idcard'){
            
            const newValue = participant[event]+1;
            await participant.updateOne({ [event]: newValue });
            await participant.save();
            res.status(200).json({ [event]: newValue });
        }
        
        
        else{
            if(participant.participated.length >=3){
                return res.status(200).json({msg : "participated 3"})
            }
            if(participant.participated.includes([event])){
                res.status(200).json({msg : "already participated"})
            }
            else{
                await participant.updateOne({ $push :{participated : [event]} })
                await participant.save();
                
                res.status(200).json({added : [event]})
            }
        }


        
        
    } catch (err) {
        // console.log(err)
        res.status(400).json({error : err})
    }
}

export const validEvent = async(req, res) => {
    try {
        const {evid} = req.params;
        const event = await Event.findOne({_id : evid})
        console.log(event)
        return res.status(200).json({event})
    } catch (err) {
        console.log(err)
        return res.status(500).json({error: 'internal server error'})
    }
    
}