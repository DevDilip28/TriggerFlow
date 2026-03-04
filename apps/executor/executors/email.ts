import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.API_KEY);

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function sendEmail(to: string, subject: string, body: string) {

  if (!isValidEmail(to)) {
    throw new Error("Invalid email format");
  }

  try {
    const response = await resend.emails.send({
      from: "TriggerFlow <no-reply@algoholic.site>",
      to,
      subject,
      html: body,
    });

    if (response.error) {
      throw new Error(response.error.message);
    }

    return response.data;

  } catch (error) {
    throw error;
  }
}
