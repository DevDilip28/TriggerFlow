import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.API_KEY);

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    const response = await resend.emails.send({
      from: "TriggerFlow <no-reply@algoholic.site>",
      to: to,
      subject: subject,
      html: body,
    });
    
  } catch (error) {
    console.error("Got error", error);
    throw error;
  }
}
