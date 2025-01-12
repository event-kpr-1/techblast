import React from 'react';
import { baseURL } from './constant/url';

const DownloadButton = () => {
    const handleDownload = async () => {
        try {
            const res = await fetch(`${baseURL}/download/xlsx/example.xlsx`, {
                method: 'GET',
                
            });

            // Check if the response is successful
            if (!res.ok) {
                throw new Error('Failed to download the file.');
            }

            // Get the content type from the response headers
            const contentType = res.headers.get('Content-Type');

            // Check if the response is the correct file type (XLSX)
            if (contentType !== 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
                throw new Error('Received invalid file type, expected an XLSX file.');
            }

            // Read the response as a Blob (binary data for the XLSX file)
            const blob = await res.blob();

            // Check if the blob is empty
            if (blob.size === 0) {
                throw new Error('The downloaded file is empty.');
            }

            // Create a URL for the blob
            const url = window.URL.createObjectURL(blob);

            // Create a temporary link to download the file
            const a = document.createElement('a');
            a.href = url;
            a.download = 'example.xlsx'; // Name for the XLSX file
            document.body.appendChild(a);
            a.click();

            // Clean up after download
            a.remove();
            window.URL.revokeObjectURL(url);

        } catch (error) {
            console.error('Download error:', error.message);
            alert(`Failed to download the file: ${error.message}`);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <button
                onClick={handleDownload}
                style={{
                    marginTop: '100px',
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Download XLSX File
            </button>
        </div>
    );
};

export default DownloadButton;
