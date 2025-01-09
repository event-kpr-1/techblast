import { Html5Qrcode } from "html5-qrcode";
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

