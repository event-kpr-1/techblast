import Event from "../model/NewEventModel.js";
import Participant from '../model/techblast_model.js';

export const printid = async (req, res) => {
    try {
        const { regno, evid } = req.params;

        // Query participant either by regno or _id
        const participant = regno.length === 24 
            ? await Participant.findOne({ _id: regno }) 
            : await Participant.findOne({ regno });

        if (!participant || participant.eventID.toString() !== evid.toString()) {
            // console.log(participant ? participant.eventID : 'No eventID', evid);
            return res.status(404).json({ error: "Participant not found", participant });
        }

        console.log(participant);
        res.status(200).json(participant);
    } catch (err) {
        console.log(`Error in printid-controller: ${err}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const printcertificate = async (req, res) => {
    try {
        const { regno } = req.params;

        // Query participant either by regno or _id
        const participant = regno.length === 24 
            ? await Participant.findOne({ _id: regno }) 
            : await Participant.findOne({ regno });

        if (!participant) {
            return res.status(404).json({ error: "Participant not found" });
        }

        console.log(participant);
        res.status(200).json({ participated: participant.participated });
    } catch (err) {
        console.log(`Error in printcertificate-controller: ${err}`);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getEvent = async (req, res) => {
    try {
        return res.status(200).json({ event: req?.event || 'Not found' });
    } catch (error) {
        console.log(`Error in getEvent-controller: ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
};
