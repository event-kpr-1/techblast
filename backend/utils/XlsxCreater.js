import XLSX from 'xlsx';
import path from 'path';
import fs from 'fs/promises'; // Use promises for asynchronous file handling

// Function to create an XLSX file
export const createExcel = async (data, fileName = 'output.xlsx') => {
    try {
        const worksheet = XLSX.utils.json_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Define a directory for exports
        const exportDir = path.join(process.cwd(), 'exports');
        await fs.mkdir(exportDir, { recursive: true }); // Ensure the directory exists

        const filePath = path.join(exportDir, fileName);
        XLSX.writeFile(workbook, filePath);

        console.log(`Excel file created successfully: ${filePath}`);
        return filePath; // Return the full path of the created file
    } catch (error) {
        console.error('Error creating Excel file:', error);
        return null; // Return null on error
    }
};
