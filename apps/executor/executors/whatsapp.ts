export async function sendWhatsapp(to: string, body: string) {
    try {
        console.log(`Sending WhatsApp message to ${to}: ${body}`);
        return true;
    } catch (error) {
        console.error("Error sending WhatsApp message:", error);
        throw error;
    }
}