// import { resendClient, sender } from "../../../config/resend.config.js";
import nodemailer from "nodemailer";
import "dotenv/config";
import { createWelcomeEmailTemplate } from "./emailTemplate.js";

export const sendWelcomeEmail = async (email, name, clientURL) => {
  // const { data, error } = await resendClient.emails.send({
  //   from: `${sender.name} <${sender.email}>`,
  //   to: email,
  //   subject: "Welcome to Chatify",
  //   html: createWelcomeEmailTemplate(name, clientURL),
  // });

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Chatify" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Welcome to Chatify!",
      html: createWelcomeEmailTemplate(name, clientURL),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email send successfully.", info);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to send welcome email.");
  }
};
