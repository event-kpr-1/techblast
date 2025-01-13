import mongoose from 'mongoose';

const TechblastSchema = mongoose.Schema({
    name : {
        type : String,
        requried : true,

    },
    college : {
        type : String,
        required : true,
        
    },
    gender : {
        type : String,
        required : true,
        
    },
    department : {
        type : String,
        required : true,
        
    },
    yearOfStudy : {
        type : String,
        
    },
    email : {
        type : String,
        required : true,
        
    },
    phone : {
        type: String,
        required: true,
    
    },
    regno : {
        type : String,
        required : true,
        
    },
    transactionID : {
        type : String,
        required : true,
    },
    transactionSC : {
        type : String,
        required : true,
    },
    
    team : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Participants",
        default : []
    }],
    participated : [{
        type : String,
        timestamps : true
        
    }],
    food : {
        type : Number,
        default : 0
    },
    idcard : {
        type : Number,
        default : 0
    },
    certificate : [{
        type : String,
        default : []
    }],
    kit : {
        type : Number,
        default : 0

    },
    eventID : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Event'
    }

    

},{timestamps : true})

const Techblast = mongoose.model("TechblastParticipant" , TechblastSchema);
export default Techblast;