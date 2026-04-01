import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Store OTPs in memory for development (in production use Redis/Supabase)
const globalForOTP = global as unknown as { _otps?: Map<string, { otp: string, expires: number }> };
if (!globalForOTP._otps) {
  globalForOTP._otps = new Map();
}
const otpStore = globalForOTP._otps;

const hardcodedUsers: Record<string, string> = {
  "ezviz01@gmail.com": "ezviz@password",
  "adeebjamil6459@gmail.com": "Adeebjamil@123"
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, email, otp } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Configure nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER || '',
        pass: process.env.EMAIL_PASSWORD || '' 
      }
    });

    if (action === 'send-otp') {
      // 1. Generate 6-digit OTP
      const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      
      // Store OTP with 10-minute expiry
      otpStore.set(email, {
        otp: generatedOtp,
        expires: Date.now() + 10 * 60 * 1000
      });

      // 2. Send OTP Email via Nodemailer
      await transporter.sendMail({
        from: `"SpeedUp System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'SpeedUp Admin - Your Recovery OTP',
        html: `
          <div style="font-family: Arial; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background-color: #030712; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">SpeedUp Aviation</h1>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #0f172a; margin-top: 0;">Recovery OTP Request</h2>
              <p style="color: #475569; line-height: 1.6;">Your One-Time Password for account recovery is:</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="background-color: #f1f5f9; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 32px; letter-spacing: 4px; color: #2563eb;">
                  ${generatedOtp}
                </span>
              </div>
              <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">This code will expire in 10 minutes. If you did not request this, please ignore it.</p>
            </div>
          </div>
        `
      });

      return NextResponse.json({ message: 'OTP sent to email.' });
    }

    if (action === 'verify-otp') {
      const storedOtpData = otpStore.get(email);
      
      if (!storedOtpData) {
        return NextResponse.json({ error: 'No active OTP found. Please request a new one.' }, { status: 400 });
      }
      
      if (Date.now() > storedOtpData.expires) {
        otpStore.delete(email);
        return NextResponse.json({ error: 'OTP has expired. Request a new one.' }, { status: 400 });
      }

      if (storedOtpData.otp !== otp) {
        return NextResponse.json({ error: 'Invalid OTP.' }, { status: 400 });
      }

      // OTP is valid! Fetch target password.
      const originalPassword = hardcodedUsers[email] || process.env.ADMIN_PASSWORD || "UnknownPassword123";

      // 3. Send final password email directly
      await transporter.sendMail({
        from: `"SpeedUp System" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'SpeedUp Admin - Your Original Password',
        html: `
          <div style="font-family: Arial; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px;">
            <div style="background-color: #030712; padding: 20px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">SpeedUp Aviation</h1>
            </div>
            <div style="padding: 30px;">
              <h2 style="color: #0f172a; margin-top: 0;">Account Recovery Successful</h2>
              <p style="color: #475569; line-height: 1.6;">As requested during the OTP verification flow, here is the original password for your account (${email}):</p>
              <div style="text-align: center; margin: 30px 0;">
                <span style="background-color: #f8fafc; padding: 15px 30px; border-radius: 6px; font-weight: bold; font-size: 20px; font-family: monospace; color: #1e293b; border: 1px dashed #cbd5e1;">
                  ${originalPassword}
                </span>
              </div>
              <p style="color: #64748b; font-size: 14px; margin-bottom: 0;">Please memorize or store this securely, and delete this email immediately for security purposes.</p>
            </div>
          </div>
        `
      });

      // Erase OTP after success
      otpStore.delete(email);

      return NextResponse.json({ message: 'Password has been sent directly to your email.' });
    }

    return NextResponse.json({ error: 'Invalid action specified' }, { status: 400 });

  } catch (error: any) {
    console.error('Password reset error:', error);
    return NextResponse.json({ error: 'Internal server error. Check Nodemailer config.' }, { status: 500 });
  }
}