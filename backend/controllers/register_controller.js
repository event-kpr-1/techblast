import Participant from "../model/participant_model.js";
import { sendMail } from "../utils/EmailSender.mjs";


export const register = async (req , res) => {
    try {
        const {name , email , college , gender , regno, phone , department} = req.body
        const {evid} = req.params;
        
        console.log(name,email,college,gender,regno,phone,department)
        

        //validating the email 
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.test(email)){
            return res.status(400).json({error : "invalid email format"})
        }

        //check for existing participant
        const existingEmail = await Participant.findOne({email : email })
        
        if(existingEmail && existingEmail.eventID.toString() === evid.toString() ){
            return res.status(400).json({error : "email already exists"})
        }
        const existingRegno = await Participant.findOne({regno : regno })
        if(existingRegno && existingRegno.eventID.toString() === evid.toString()){
            return res.status(400).json({error : "regno already exists"})
        }

        const phonenoRegex = /^\d{10}$/
        if(!phonenoRegex.test(phone)){
            return res.status(400).json({error : "invaild phone number"})
        }


        // creating new Participant
        const newParticipant = new Participant({
            name : name,
            email : email,
            college : college,
            phone : phone,
            gender : gender,
            regno : regno,
            eventID : evid,
            department : department
            
            
        })

        // saving the details of new Participant
        if(newParticipant){
            
            await newParticipant.save();
            if(process.env.SEND_MAIL === 'true'){
                const htmlTemplate = `
                    <h1>Welcome to Event KPR</h1>
                    <p>We're excited to have you!</p>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${newParticipant.regno}" alt=${newParticipant.regno} />
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${newParticipant._id}" alt=${newParticipant._id} />`;
            
                await  sendMail(newParticipant.email, 'Registered KPR Event', 'You have been registered to the event', '', htmlTemplate)
                        .then(() => console.log('Email sent successfully!'))
                        .catch(err => console.error('Failed to send email:', err));
            }
              
            res.status(200).json({
                _id : newParticipant.id,
                name : newParticipant.name,
                gender : newParticipant.gender,
                email : newParticipant.email,
                regno : newParticipant.regno,
            })
            

        }else {
            res.status(404).json({error : "invalid Participant Data"})
        }
        
    } catch (err) {
        console.log(`error at register-register-controller : ${err}` )
        res.status(400).json({error : "internal server error"})
    }
}
export const regShow = async (req , res) => {
    try {
        const {regno , evid} = req.params;

        
        const participant = regno.length === 24 ? await Participant.findOne({_id : regno}) : await Participant.findOne({regno : regno})

        
        if(!participant || participant.eventID.toString() !== evid.toString()){
            return res.status(404).json({error : "participant not found"})
        }
        // console.log(participant)

        res.status(200).json({
            _id : participant.id,
            name : participant.name,
            college : participant.college,
            email : participant.email,
            regno : participant.regno,
            phone : participant.phone
        })
    } catch (err) {
        console.log(`error at resShow-register-controller : ${err}` );
        res.status(400).json({error : "internal server error"});
    }
}