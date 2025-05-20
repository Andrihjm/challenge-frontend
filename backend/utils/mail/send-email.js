import dotenv from "dotenv";
import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT) || 587,
  service: process.env.SMTP_SERVICE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const renderEmailTamplate = async (templateName, data) => {
  const templatePath = path.join(
    process.cwd(),
    "backend",
    "utils",
    "mail",
    "email-templates",
    `${templateName}.ejs`
  );

  return ejs.renderFile(templatePath, data);
};

export const sendEmail = async (to, subject, templateName, data) => {
  try {
    const html = await renderEmailTamplate(templateName, data);

    await transporter.sendMail({
      from: `${process.env.SMTP_USER}`,
      to,
      subject,
      html,
    });

    return true;
  } catch (error) {
    console.log("Error sending email", error);
    return false;
  }
};
