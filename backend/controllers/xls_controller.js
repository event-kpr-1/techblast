import { createExcel } from '../utils/XlsxCreater.js';
import { sendXlsx } from '../utils/XlsSender.js';
import Participant from '../model/techblast_model.js';

export const downloadXls = async (req, res) => {
    const { filename = 'all' } = req.params; // Default file name

    try {
        // Fetch and filter participants based on the filename
        let participantsQuery = Participant.find().select('-team -_id -certificate').lean();

        // If filename is not 'all', filter participants who have the filename in their subevent list
        if (filename === 'idcard' || filename === 'food' || filename === 'kit') {
            participantsQuery = participantsQuery.where(filename).gt(0);
        }
        else if(filename !== 'all') {
            participantsQuery = participantsQuery.where('participated').elemMatch({ $eq: filename });
        }

        const participants = await participantsQuery;

        // Clean and transform the data (optional, based on your needs)
        const cleanedData = participants.map((participant) => ({
            Name: participant.name,
            College: participant.college,
            Gender: participant.gender,
            Department: participant.department,
            YearOfStudy: participant.yearOfStudy,
            Email: participant.email,
            Phone: participant.phone,
            RegistrationNo: participant.regno,
            TransactionID: participant.transactionID,
            TransactionSC: participant.transactionSC,
            Participated: Array.isArray(participant.participated)
                ? participant.participated.join(', ') // Join array into a single string
                : participant.participated,
            Food: participant.food ,
            IDCard: participant.idcard ,
            Kit: participant.kit ,
            EventID: participant.eventID.toString(), // Convert ObjectId to string
            CreatedAt: participant.createdAt.toISOString(),
            UpdatedAt: participant.updatedAt.toISOString(),
        }));

        // Step 1: Create the Excel file
        const filePath = await createExcel(cleanedData, `${filename}.xlsx`);
        if (!filePath) {
            return res.status(500).json({ error: 'Error creating Excel file.' });
        }

        // Step 2: Send the Excel file
        await sendXlsx(filePath, res);
    } catch (error) {
        console.error('Error downloading Excel:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
};
