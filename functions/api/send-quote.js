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
      files
    } = body;

    // Temel validasyon
    if (!companyName || !contactPerson || !email || !phone || !projectDetails) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Zorunlu alanları doldurmak gereklidir.' 
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
      subject: `[Website Teklif] ${companyName} - ${category || quoteType}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 700px; margin: 0 auto;">
          <h2 style="color: #1e40af; border-bottom: 2px solid #1e40af; padding-bottom: 10px;">
            Yeni Teklif Talebi
          </h2>
          
          <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Firma Bilgileri</h3>
            <p><strong>Şirket Adı:</strong> ${companyName}</p>
            <p><strong>Yetkili Kişi:</strong> ${contactPerson}</p>
            <p><strong>Pozisyon:</strong> ${position || 'Belirtilmemiş'}</p>
            <p><strong>E-posta:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone}</p>
          </div>
          
          <div style="background: #fefefe; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <h3 style="color: #374151; margin-top: 0;">Teklif Detayları</h3>
            <p><strong>Teklif Türü:</strong> ${quoteType || 'Belirtilmemiş'}</p>
            <p><strong>Kategori:</strong> ${category || 'Belirtilmemiş'}</p>
            <p><strong>Alt Kategori:</strong> ${subcategory || 'Belirtilmemiş'}</p>
            ${customRequirement ? `<p><strong>Özel İhtiyaç:</strong> ${customRequirement}</p>` : ''}
            <p><strong>Bütçe:</strong> ${budget || 'Belirtilmemiş'}</p>
            <p><strong>Zaman Planı:</strong> ${timeline || 'Belirtilmemiş'}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #374151;">Proje Detayları:</h3>
            <div style="background: white; padding: 15px; border-left: 4px solid #1e40af; border-radius: 4px;">
              ${projectDetails.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          ${files && files.length > 0 ? `
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Dosya Sayısı:</strong> ${files.length} dosya yüklendi</p>
            <p style="font-size: 12px; color: #92400e;">Not: Dosyalar bu e-posta ile birlikte gönderilmez. Müşteri ile ayrıca iletişime geçilmelidir.</p>
          </div>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
            Bu teklif talebi Protek Analitik website teklif formu üzerinden gönderilmiştir.
          </div>
        </div>
      `
    };

    // E-posta gönder
    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Teklifiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.' 
    }), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'E-posta gönderme sırasında bir hata oluştu. Lütfen tekrar deneyin.' 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
