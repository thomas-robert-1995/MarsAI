import nodemailer from "nodemailer";
import db from "../config/database.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const logEmail = async (to, subject, type, status, error = null) => {
  try {
    await db.query(
      `INSERT INTO email_logs (recipient_email, subject, email_type, status, error_message, sent_at)
       VALUES (?, ?, ?, ?, ?, NOW())`,
      [to, subject, type, status, error]
    );
  } catch (err) {
    console.error("Failed to log email:", err);
  }
};

export const sendInvitationEmail = async (email, token, roleName) => {
  const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
  const inviteUrl = `${frontendUrl}/invite/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@marsai.com",
    to: email,
    subject: "Invitation au Festival MarsAI",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #463699;">Bienvenue sur MarsAI!</h1>
        <p>Vous avez ete invite a rejoindre le Festival MarsAI en tant que <strong>${roleName}</strong>.</p>
        <p>Cliquez sur le bouton ci-dessous pour creer votre compte:</p>
        <a href="${inviteUrl}" style="display: inline-block; background-color: #463699; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; margin: 20px 0;">
          Accepter l'invitation
        </a>
        <p style="color: #666; font-size: 12px;">Ce lien expire dans 7 jours.</p>
        <p style="color: #666; font-size: 12px;">Si vous n'avez pas demande cette invitation, ignorez cet email.</p>
      </div>
    `,
  };

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      await logEmail(email, mailOptions.subject, "invitation", "sent");
    } else {
      console.log("Email not configured. Invitation URL:", inviteUrl);
      await logEmail(email, mailOptions.subject, "invitation", "skipped", "Email not configured");
    }
    return true;
  } catch (error) {
    console.error("Send invitation email error:", error);
    await logEmail(email, mailOptions.subject, "invitation", "failed", error.message);
    return false;
  }
};

export const sendFilmStatusEmail = async (email, filmTitle, status, reason = null) => {
  const statusText = status === "approved" ? "approuve" : "refuse";
  const subject = `Votre film "${filmTitle}" a ete ${statusText}`;

  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h1 style="color: #463699;">MarsAI Festival</h1>
      <p>Bonjour,</p>
      <p>Votre film <strong>"${filmTitle}"</strong> a ete <strong>${statusText}</strong>.</p>
  `;

  if (status === "approved") {
    html += `<p>Felicitations! Votre film sera visible dans le catalogue du festival.</p>`;
  } else if (reason) {
    html += `<p>Raison du refus: ${reason}</p>`;
  }

  html += `
      <p>Cordialement,<br>L'equipe MarsAI</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER || "noreply@marsai.com",
    to: email,
    subject,
    html,
  };

  try {
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      await transporter.sendMail(mailOptions);
      await logEmail(email, subject, "film_status", "sent");
    } else {
      console.log("Email not configured. Would send:", subject);
    }
    return true;
  } catch (error) {
    console.error("Send film status email error:", error);
    return false;
  }
};
