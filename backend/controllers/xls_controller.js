import { createExcel } from '../utils/XlsxCreater.js';
import { sendXlsx } from '../utils/XlsSender.js';
import Participant from '../model/techblast_model.js';

export const downloadXls = async (req, res) => {
    const { filename = 'output.xlsx' } = req.params; // Default file name

    try {
        // Fetch and transform data
        const participants = await Participant.find()
            .select('-team -_id -certificate ')
            .lean(); // Converts Mongoose documents to plain JS objects

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
            participated : Array.isArray(participant.participated)
            ? participant.participated.join(', ') // Join array into a single string
            : participant.participated,
            Food: participant.food ? "Yes" : "No",
            IDCard: participant.idcard ? "Yes" : "No",
            Kit: participant.kit ? "Yes" : "No",
            EventID: participant.eventID.toString(), // Convert ObjectId to string
            CreatedAt: participant.createdAt.toISOString(),
            UpdatedAt: participant.updatedAt.toISOString(),
        }));

        // Step 1: Create the Excel file
        const filePath = await createExcel(cleanedData, filename);
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
