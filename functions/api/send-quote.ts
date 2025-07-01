import nodemailer from 'nodemailer';

// Define the environment variables we expect
interface Env {
  GMAIL_USER: string;
  GMAIL_APP_PASSWORD: string;
  // Add other env vars if needed, e.g., for Outlook
  OUTLOOK_USER?: string;
  OUTLOOK_PASSWORD?: string;
}

// Email SMTP transporter oluştur
const createTransporter = (env: Env) => {
  // Gmail kullanıyorsanız
  if (env.GMAIL_USER && env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD,
      },
    });
  }
  
  // Outlook kullanıyorsanız
  if (env.OUTLOOK_USER && env.OUTLOOK_PASSWORD) {
    return nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: env.OUTLOOK_USER,
        pass: env.OUTLOOK_PASSWORD,
      },
    });
  }
  
  throw new Error('Email konfigürasyonu bulunamadı');
};

// Handle POST requests to /api/send-quote
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json();
    
    const {
      quoteType,
      category,
      subcategory,
      customRequirement,
      projectDetails,
      budget,
      timeline,
      companyName,
      contactPerson,
      email,
      phone,
      position,
      files // Note: file handling will be different in serverless, this example assumes JSON data
    } = body;

    // Email içeriğini hazırla (This is the same HTML content from the original file)
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">Yeni Teklif Talebi</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Protek Analitik Web Sitesi</p>
        </div>
        
        <div style="padding: 30px; background: white;">
          <h2 style="color: #333; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Talep Detayları</h2>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">Genel Bilgiler</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Teklif Türü:</td>
                <td style="padding: 8px 0; color: #333;">${quoteType}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Kategori:</td>
                <td style="padding: 8px 0; color: #333;">${category}</td>
              </tr>
              ${subcategory ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Alt Kategori:</td>
                <td style="padding: 8px 0; color: #333;">${subcategory}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Bütçe:</td>
                <td style="padding: 8px 0; color: #333;">${budget}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Zaman Çizelgesi:</td>
                <td style="padding: 8px 0; color: #333;">${timeline}</td>
              </tr>
            </table>
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">Proje Detayları</h3>
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #667eea;">
              ${projectDetails.replace(/\n/g, '<br>')}
            </div>
            ${customRequirement ? `
            <div style="margin-top: 15px;">
              <strong style="color: #555;">Özel Gereksinimler:</strong>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #28a745; margin-top: 8px;">
                ${customRequirement.replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}
          </div>

          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">İletişim Bilgileri</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Şirket:</td>
                <td style="padding: 8px 0; color: #333;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">İletişim Kişisi:</td>
                <td style="padding: 8px 0; color: #333;">${contactPerson}</td>
              </tr>
              ${position ? `
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Pozisyon:</td>
                <td style="padding: 8px 0; color: #333;">${position}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td>
                <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #667eea;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #667eea;">${phone}</a></td>
              </tr>
            </table>
          </div>

          ${files && files.length > 0 ? `
          <div style="margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">Ek Dosyalar</h3>
            <p style="color: #666; font-style: italic;">${files.length} dosya eklendi (dosyalar ayrıca işlenecektir)</p>
          </div>
          ` : ''}
        </div>
        
        <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;">
          <p style="color: #666; margin: 0; font-size: 14px;">
            Bu e-posta Protek Analitik web sitesinden otomatik olarak gönderilmiştir.
          </p>
          <p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">
            Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}
          </p>
        </div>
      </div>
    `;

    // Gmail SMTP ile email gönder
    const transporter = createTransporter(env);
    
    const mailOptions = {
      from: `"Protek Analitik Website" <${env.GMAIL_USER || env.OUTLOOK_USER}>`,
      to: 'websiteform@protekanalitik.com',
      subject: `Yeni Teklif Talebi - ${companyName} (${category})`,
      html: emailContent,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    const responseBody = { 
      success: true, 
      message: 'Teklif talebiniz başarıyla gönderildi!' 
    };
    return new Response(JSON.stringify(responseBody), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email gönderme hatası:', error);
    const errorBody = { 
      success: false, 
      message: 'E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' 
    };
    return new Response(JSON.stringify(errorBody), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
