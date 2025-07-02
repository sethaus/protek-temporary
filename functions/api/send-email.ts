// We avoid heavy `googleapis` to keep bundle size small; use direct HTTP calls instead.
// No external imports needed besides built-in `Buffer`.
import { Buffer } from 'buffer';

// Define the structure for the environment variables
interface Env {
  GMAIL_USER: string;
  OAUTH_CLIENT_ID: string;
  OAUTH_CLIENT_SECRET: string;
  OAUTH_REFRESH_TOKEN: string;
}

// Define the structure for the incoming form data
interface FormData {
  type: 'contact' | 'quote' | 'complaint' | 'training';
  email: string; // Assuming email is always present for reply-to
  [key: string]: any;
}

// Helper function to generate HTML content for the email
function generateEmailHtml(data: FormData): string {
  switch (data.type) {
    case 'contact':
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Yeni İletişim Formu Mesajı</h2>
          <p><strong>Ad Soyad:</strong> ${data.name}</p>
          <p><strong>E-posta:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <hr>
          <h3 style="color: #555;">Mesaj:</h3>
          <p>${data.message}</p>
        </div>
      `;
    case 'quote':
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Yeni Teklif Talebi</h2>
          <p><strong>Gönderen:</strong> ${data.name}</p>
          <p><strong>Firma:</strong> ${data.company}</p>
          <p><strong>E-posta:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <hr>
          <h3 style="color: #555;">Talep Detayları:</h3>
          <pre>${JSON.stringify(data.stepData, null, 2)}</pre>
        </div>
      `;
    case 'complaint':
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Yeni Şikayet/Öneri Formu</h2>
          <p><strong>Gönderen:</strong> ${data.name}</p>
          <p><strong>Firma:</strong> ${data.company}</p>
          <p><strong>E-posta:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <hr>
          <p><strong>Form Tipi:</strong> ${data.complaintType}</p>
          <p><strong>Konu:</strong> ${data.complaintSubject}</p>
          <p><strong>Detaylar:</strong></p>
          <p>${data.complaintDetails}</p>
        </div>
      `;
    case 'training':
      return `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">Yeni Eğitim Talebi</h2>
          <p><strong>Gönderen:</strong> ${data.name}</p>
          <p><strong>Unvan:</strong> ${data.position}</p>
          <p><strong>Firma:</strong> ${data.company}</p>
          <p><strong>E-posta:</strong> ${data.email}</p>
          <p><strong>Telefon:</strong> ${data.phone}</p>
          <hr>
          <p><strong>Talep Edilen Eğitim:</strong> ${data.trainingType}</p>
          <p><strong>Katılımcı Sayısı:</strong> ${data.participantCount}</p>
          <p><strong>Tercih Edilen Tarih:</strong> ${data.preferredDate}</p>
          <p><strong>Ek Notlar:</strong></p>
          <p>${data.additionalNotes}</p>
        </div>
      `;
    default:
      return '<p>Bilinmeyen form tipi veya hatalı veri.</p>';
  }
}

// Main Cloudflare Pages function
export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body: FormData = await request.json();
    const { GMAIL_USER, OAUTH_CLIENT_ID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = env;

    // Validate environment variables
    if (!GMAIL_USER || !OAUTH_CLIENT_ID || !OAUTH_CLIENT_SECRET || !OAUTH_REFRESH_TOKEN) {
      console.error('Missing environment variables for email sending.');
      return new Response(JSON.stringify({ success: false, message: 'Sunucu yapılandırma hatası.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

        // Obtain a fresh access token using the refresh token
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: OAUTH_CLIENT_ID,
        client_secret: OAUTH_CLIENT_SECRET,
        refresh_token: OAUTH_REFRESH_TOKEN,
        grant_type: 'refresh_token',
      }),
    });

    if (!tokenRes.ok) {
      throw new Error(`Token request failed with ${tokenRes.status}`);
    }

    const tokenJson: { access_token?: string } = await tokenRes.json();
    const accessToken = tokenJson.access_token;
    if (!accessToken) {
      throw new Error('Failed to obtain access token.');
    }

    // Determine email subject
    let subject = 'Yeni Web Formu Mesajı';
    switch (body.type) {
        case 'contact': subject = `Yeni İletişim Formu Mesajı: ${body.name}`; break;
        case 'quote': subject = `Yeni Teklif Talebi: ${body.name || body.company}`; break;
        case 'complaint': subject = `Yeni Şikayet/Öneri: ${body.name}`; break;
        case 'training': subject = `Yeni Eğitim Talebi: ${body.name}`; break;
    }

    const htmlContent = generateEmailHtml(body);
    // Deliver to the same authenticated Gmail account so it lands in its Inbox
    const recipientEmail = GMAIL_USER;
    const replyToEmail = body.email;

    // Construct the email in MIME format
    const emailLines = [
      `From: "Protek Analitik Web" <${GMAIL_USER}>`,
      `To: ${recipientEmail}`,
      `Reply-To: ${replyToEmail}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      `Subject: =?utf-8?B?${Buffer.from(subject).toString('base64')}?=`, // Encode subject for special characters
      '',
      htmlContent,
    ];
    const email = emailLines.join('\r\n');

        // Encode the email in base64url format
    const encodedMessage = Buffer.from(email)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    // Send the email using Gmail REST API
    const gmailRes = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw: encodedMessage }),
    });

    if (!gmailRes.ok) {
      const errText = await gmailRes.text();
      throw new Error(`Gmail API error ${gmailRes.status}: ${errText}`);
    }

    return new Response(JSON.stringify({ success: true, message: 'Mesajınız başarıyla gönderildi.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Email sending error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Bilinmeyen bir hata oluştu.';
    return new Response(JSON.stringify({ success: false, message: `E-posta gönderilemedi: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
