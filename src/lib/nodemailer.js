import nodemailer from "nodemailer";

// Single transporter instance (authenticates with main account)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Helper function to send emails with proper from address
export async function sendEmail({
  from,
  to,
  subject,
  html,
  senderName,
  replyTo,
}) {
  const displayName = senderName || "pacser.org";

  return await transporter.sendMail({
    from: `"${displayName}" <${from}>`,
    to,
    subject,
    html,
    replyTo,
  });
}

export default transporter;
