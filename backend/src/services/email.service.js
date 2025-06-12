const SibApiV3Sdk = require('@getbrevo/brevo');

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.EMAIL_PASS);

const sendEmail = async (to, subject, html) => {
  const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
  sendSmtpEmail.to = [{ email: to }];
  sendSmtpEmail.subject = subject;
  sendSmtpEmail.htmlContent = html;
  sendSmtpEmail.sender = { 
    name: 'RarePair',
    email: process.env.EMAIL_USER 
  };

  try {
    const result = await apiInstance.sendTransacEmail(sendSmtpEmail);
    return result;
  } catch (err) {
    console.error('Email error:', err);
    throw new Error('Email failed: ' + err.message);
  }
};

const sendOTP = async (email, otp) => {
  const subject = 'Your RarePair OTP';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1976d2;">RarePair OTP Verification</h2>
      <p>Your OTP for RarePair is:</p>
      <h1 style="color: #1976d2; font-size: 32px; letter-spacing: 5px;">${otp}</h1>
      <p>This OTP is valid for 10 minutes.</p>
      <p>If you didn't request this OTP, please ignore this email.</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message, please do not reply.
      </p>
    </div>
  `;
  return sendEmail(email, subject, html);
};

const sendMatchNotification = async (email, matchDetails) => {
  const subject = 'New Match Found - RarePair';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #1976d2;">New Match Found!</h2>
      <p>We found a potential match for you:</p>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
        <p><strong>Blood Type:</strong> ${matchDetails.bloodType}</p>
        <p><strong>Location:</strong> ${matchDetails.location}</p>
        <p><strong>Compatibility Score:</strong> ${matchDetails.compatibility}%</p>
      </div>
      <p>Please log in to your RarePair account to view more details.</p>
      <hr style="border: 1px solid #eee; margin: 20px 0;">
      <p style="color: #666; font-size: 12px;">
        This is an automated message, please do not reply.
      </p>
    </div>
  `;
  return sendEmail(email, subject, html);
};

module.exports = {
  sendEmail,
  sendOTP,
  sendMatchNotification
}; 