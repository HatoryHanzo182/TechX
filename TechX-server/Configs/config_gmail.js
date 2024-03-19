import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const _postcard_path = path.join(
  __dirname,
  "../Content/html/GmailVerefication.html"
);

async function ReadHTMLFile() {
  try {
    const html = await fs.readFile(_postcard_path, "utf-8");
    return html;
  } catch (error) {
    console.error("Error reading HTML file:", error);
    throw error;
  }
}

async function SendMail(postcard_content) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.GMAIL, pass: process.env.PASSWORD_GMAIL },
    });

    const mail_options = {
      from: process.env.GMAIL,
      to: "nice140@icloud.com",
      subject: "Confirm your email on TechX",
      html: postcard_content,
    };

    const info = await transporter.sendMail(mail_options);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

(async () => {
  try {
    const postcard = await ReadHTMLFile();

    await SendMail(postcard);
  } catch (error) {
    console.error("Error:", error);
  }
})();
