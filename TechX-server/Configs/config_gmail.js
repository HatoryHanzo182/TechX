import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const _postcard_path = path.join(__dirname, "../Content/html/GmailVerefication.html");
let _user_gmail;
let _code;

async function ReadHTMLFile() 
{
  try 
  {
    const html = await fs.readFile(_postcard_path, "utf-8");
    
    return html;
  } 
  catch (error) 
  {
    console.error("Error reading HTML file:", error);
    throw error;
  }
}

async function SendMail(postcard_content) 
{
  try 
  {
    const transporter = nodemailer.createTransport(
    {
      service: "gmail",
      auth: { user: process.env.GMAIL, pass: process.env.PASSWORD_GMAIL },
    });

    const mail_options = 
    {
      from: process.env.GMAIL,
      to: _user_gmail,
      subject: "Confirm your email on TechX",
      html: postcard_content,
    };

    await transporter.sendMail(mail_options);
  } 
  catch (error) { console.error("Error sending email:", error); }
}

function SEND_CODE_VERIFICATION(user_gmail, code)
{
  _user_gmail = user_gmail;
  _code = code;

  (async () => 
  {
    try 
    {
      let postcard = await ReadHTMLFile();

      postcard = postcard.replace('<p>XXXX</p>', `<p>${_code}</p>`);

      await SendMail(postcard);
    } 
    catch (error) { console.error("Error:", error); }
  })();
}

export default SEND_CODE_VERIFICATION;