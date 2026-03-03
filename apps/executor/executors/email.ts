import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.API_KEY);

export async function sendEmail(to: string, subject: string, body: string) {
  try {
    await resend.emails.send({
      from: "TriggerFlow <no-reply@algoholic.site>",
      to: to,
      subject: subject,
      html: body,
    });
    console.log("Email send");
  } catch (error) {
    console.error("Send email error");
  }
}
