const nodemailer = require('nodemailer');

export async function onRequest(context) {
  const { request, env } = context;
  
  // CORS başlıkları
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  };

  // CORS preflight için OPTIONS isteği
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  try {
    const body = await request.json();
    const { name, email, subject, message, type } = body;

    // Temel validasyon
    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ 
        success: false, 
        error: 'Tüm alanları doldurmak zorunludur.' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // Gmail SMTP ayarları
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: 'websiteform@protekanalitik.com',
        pass: 'pgdjioiltvkxqqqg'
      }
    });

    // E-posta içeriği
    const mailOptions = {
      from: 'websiteform@protekanalitik.com',
      to: 'info@protekanalitik.com',
      subject: `[Website İletişim] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Yeni İletişim Formu Mesajı
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Ad Soyad:</strong> ${name}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Konu:</strong> ${subject}</p>
            <p><strong>Mesaj Türü:</strong> ${type || 'Genel'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Mesaj:</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #1e40af; border-radius: 4px;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            Bu mesaj Protek Analitik website iletişim formu üzerinden gönderilmiştir.
          </div>
        </div>
      `
    };

    // E-posta gönder
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Mesajınız başarıyla gönderildi!' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      error: 'E-posta gönderme sırasında bir hata oluştu.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
