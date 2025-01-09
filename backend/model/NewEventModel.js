import mongoose from "mongoose";

const NewEventSchema = mongoose.Schema({
    eventName : {
        type : String,
        required : true
    },
    eventDetails : {
        type : String,
        required : true
    },
    eventDate : {
        type : Date,
        default : Date.now
    },
    expectedParticipantCount : {
        type : Number,
        default : 0
    },
    eventCoordinators : [{
        name :{type : String},
        email :{type : String},
        phone :{type : String},
        default : []
    }],
    eventFor : {
        type : String
    },
    subEvents : [
        {
            evName : {
                type : String,
            },
            evDesc : {
                type : String,
            },
            default : []
        }
    ],
    createdBy : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "AdminUser",
        required : true
    }
},{timestamps : true})

const Event = mongoose.model('Event' , NewEventSchema);
export default Event;