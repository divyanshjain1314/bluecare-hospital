// lib/mail.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendWelcomeEmail = async (email: string, name: string, token: string) => {
    const domain = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const invitationLink = `${domain}/setup-password/${token}`;

    const htmlContent = `
        <div style="font-family: 'Outfit', sans-serif; max-width: 600px; margin: auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 24px; background-color: #ffffff;">
            <h2 style="color: #1e293b; margin-bottom: 20px;">Welcome to BlueCare, Dr. ${name}!</h2>
            
            <p style="color: #475569; line-height: 1.6; font-size: 15px;">
                Your professional account has been successfully created on the <strong>BlueCare Medical Dashboard</strong>. 
                To get started and access your patient records, you need to set up a secure password for your account.
            </p>

            <div style="text-align: center; margin: 35px 0;">
                <a href="${invitationLink}" 
                   style="background-color: #2563eb; color: #ffffff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 600; display: inline-block; font-size: 16px; box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);">
                   Setup Your Password
                </a>
            </div>

            <p style="color: #64748b; font-size: 13px; line-height: 1.5;">
                <strong>Security Note:</strong> This invitation link is valid for <strong>24 hours</strong>. 
                If you did not expect this invitation, please disregard this email.
            </p>

            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #f1f5f9;">
                <p style="color: #1e293b; font-weight: bold; margin-bottom: 4px;">Best Regards,</p>
                <p style="color: #2563eb; font-weight: 600; margin-top: 0;">The BlueCare Administration Team</p>
            </div>
        </div>
    `;

    await transporter.sendMail({
        from: '"BlueCare Medical" <noreply@bluecare.com>',
        to: email,
        subject: 'Welcome to BlueCare - Set Your Password',
        html: htmlContent,
    });
};