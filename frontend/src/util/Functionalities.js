import { Html5Qrcode } from "html5-qrcode";
import { baseURL } from "../constant/url.js";

export const scanner = async (scannerRef,qrCodeRegionId ,result) => {
    if (scannerRef.current) {
        const html5QrCode = new Html5Qrcode(qrCodeRegionId);
        console.log(html5QrCode);

        const startQrScanner = async () => {
            
            try {
                    
                await html5QrCode.start(
                    { facingMode: "environment" },
                    {
                        fps: 10,
                        qrbox: { width: 250, height: 250 },
                    },
                    async (decodedText) => {
                        
                        // console.log("Scanned:", decodedText);
                        result(decodedText)
                        
                        
                        html5QrCode.stop();
                        
                        
                    }
                );
                } catch (err) {
                    console.log(err);
                    result('error')
                } finally {
                    return 
                }
            
        };

        (() => startQrScanner())();
        setTimeout(async() => {
            if(html5QrCode.isScanning)
                html5QrCode.stop();
        }, 6000);
    }
}

export const download = async (eventName = 'all') => {
        try {

            const res = await fetch(`${baseURL}/download/xlsx/${eventName}`, {
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
            a.download = `${eventName}.xlsx`; // Name for the XLSX file
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

