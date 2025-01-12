import path from 'path';
import fs from 'fs/promises'; // For async file handling

export const sendXlsx = async (filePath, res) => {
    try {
        // Check if the file exists
        await fs.access(filePath);

        // Extract file name for attachment header
        const fileName = path.basename(filePath);

        // Set headers for XLSX download
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

        // Send the file
        res.sendFile(filePath, (err) => {
            if (err) {
                console.error('Error sending file:', err);
                res.status(500).json({ error: 'Error sending file.' });
            } else {
                console.log('File sent successfully');

                // Optionally delete the file after sending
                fs.unlink(filePath).catch((err) =>
                    console.error('Error deleting temporary file:', err)
                );
            }
        });
    } catch (err) {
        console.error('File not found or error accessing:', err);
        res.status(404).json({ error: 'File not found.' });
    }
};
