import { google } from 'googleapis';
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

    // Set up OAuth2 client
    const oauth2Client = new google.auth.OAuth2(
      OAUTH_CLIENT_ID,
      OAUTH_CLIENT_SECRET,
      'https://developers.google.com/oauthplayground' // Redirect URI, not used in server-to-server flow
    );

    oauth2Client.setCredentials({ refresh_token: OAUTH_REFRESH_TOKEN });

    // Get a new access token
    const accessToken = await oauth2Client.getAccessToken();
    if (!accessToken.token) {
        throw new Error('Failed to create access token.');
    }

    // Set up Gmail API
    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Determine email subject
    let subject = 'Yeni Web Formu Mesajı';
    switch (body.type) {
        case 'contact': subject = `Yeni İletişim Formu Mesajı: ${body.name}`; break;
        case 'quote': subject = `Yeni Teklif Talebi: ${body.name || body.company}`; break;
        case 'complaint': subject = `Yeni Şikayet/Öneri: ${body.name}`; break;
        case 'training': subject = `Yeni Eğitim Talebi: ${body.name}`; break;
    }

    const htmlContent = generateEmailHtml(body);
    const recipientEmail = 'info@protekanalitik.com'; // The final recipient
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
    const encodedMessage = Buffer.from(email).toString('base64url');

    // Send the email
    await gmail.users.messages.send({
      userId: 'me', // 'me' refers to the authenticated user
      requestBody: {
        raw: encodedMessage,
      },
    });

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

  // The email needs to be Base64-encoded.
  const base64EncodedEmail = btoa(unescape(encodeURIComponent(email)));

  await gmail.users.messages.send({
    userId: 'me',
    requestBody: {
      raw: base64EncodedEmail
    }
  });
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const { request, env } = context;
    const body: FormData = await request.json();

    const requiredVars: (keyof Env)[] = ['GMAIL_USER', 'OAUTH_CLIENT_ID', 'OAUTH_CLIENT_SECRET', 'OAUTH_REFRESH_TOKEN'];
    for (const varName of requiredVars) {
      if (!env[varName]) {
        console.error(`Missing environment variable: ${varName}`);
        return new Response(JSON.stringify({ success: false, message: `Server Error: Environment variable ${varName} is not set.` }), {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        });
      }
    }

    await createAndSendEmail(env, body);

    return new Response(JSON.stringify({ success: true, message: 'E-posta başarıyla gönderildi.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending email:', error);
    let errorMessage = 'An unknown error occurred.';
    if (error instanceof Error) {
      errorMessage = error.message;
      // Try to extract a more specific error message from the Google API response
      const gapiError = error as any;
      if (gapiError.errors && gapiError.errors[0] && gapiError.errors[0].message) {
        errorMessage = gapiError.errors[0].message;
      }
    }

    return new Response(JSON.stringify({ success: false, message: `Server Error: ${errorMessage}` }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
