import nodemailer from 'nodemailer';

// Define the environment variables we expect
interface Env {
  GMAIL_USER: string;
  GMAIL_APP_PASSWORD: string;
  OUTLOOK_USER?: string;
  OUTLOOK_PASSWORD?: string;
}

// Email SMTP transporter oluştur
const createTransporter = (env: Env) => {
  if (env.GMAIL_USER && env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD,
      },
    });
  }
  
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

// Handle POST requests to /api/send-contact
export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const body = await request.json();
    
    const formType = body.formType || body.type; // Check for 'type' from general form

    const {
      subject,
      message,
      name,
      email,
      phone,
      company,
      position,
      complaintType,
      complaintSubject,
      complaintDetails,
      trainingType,
      participantCount,
      preferredDate,
      additionalNotes
    } = body;

    let emailContent = '';
    let emailSubject = '';

    if (formType === 'complaint') {
      emailSubject = `Şikayet ve Öneri - ${complaintType}: ${complaintSubject}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Şikayet ve Öneri</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Protek Analitik Web Sitesi</p>
          </div>
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; border-bottom: 2px solid #dc2626; padding-bottom: 10px;">Geri Bildirim Detayları</h2>
            <div style="margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Konu Türü:</td><td style="padding: 8px 0; color: #333;">${complaintType}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Konu Başlığı:</td><td style="padding: 8px 0; color: #333;">${complaintSubject}</td></tr>
              </table>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #dc2626; margin-bottom: 15px;">Detaylı Açıklama</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">${complaintDetails.replace(/\n/g, '<br>')}</div>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #dc2626; margin-bottom: 15px;">İletişim Bilgileri</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Ad Soyad:</td><td style="padding: 8px 0; color: #333;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td><td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #dc2626;">${phone}</a></td></tr>` : ''}
              </table>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;"><p style="color: #666; margin: 0; font-size: 14px;">Bu e-posta Protek Analitik web sitesinden otomatik olarak gönderilmiştir.</p><p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}</p></div>
        </div>`;
    } else if (formType === 'training') {
      emailSubject = `Eğitim Talebi - ${trainingType}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f97316 0%, #ea580c 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Eğitim Talebi</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Protek Analitik Web Sitesi</p>
          </div>
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; border-bottom: 2px solid #f97316; padding-bottom: 10px;">Talep Detayları</h2>
            <div style="margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Eğitim Türü:</td><td style="padding: 8px 0; color: #333;">${trainingType}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Katılımcı Sayısı:</td><td style="padding: 8px 0; color: #333;">${participantCount}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Tercih Edilen Tarih:</td><td style="padding: 8px 0; color: #333;">${preferredDate}</td></tr>
              </table>
            </div>
            ${additionalNotes ? `<div style="margin: 20px 0;"><h3 style="color: #f97316; margin-bottom: 15px;">Ek Notlar</h3><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f97316;">${additionalNotes.replace(/\n/g, '<br>')}</div></div>` : ''}
            <div style="margin: 20px 0;">
              <h3 style="color: #f97316; margin-bottom: 15px;">İletişim Bilgileri</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Ad Soyad:</td><td style="padding: 8px 0; color: #333;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Şirket:</td><td style="padding: 8px 0; color: #333;">${company}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #f97316;">${email}</a></td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td><td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #f97316;">${phone}</a></td></tr>
              </table>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;"><p style="color: #666; margin: 0; font-size: 14px;">Bu e-posta Protek Analitik web sitesinden otomatik olarak gönderilmiştir.</p><p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}</p></div>
        </div>`;
    } else {
      emailSubject = `İletişim Formu: ${subject}`;
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">İletişim Formu</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Protek Analitik Web Sitesi</p>
          </div>
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Mesaj Detayları</h2>
            ${subject ? `<div style="margin: 20px 0;"><h3 style="color: #3b82f6; margin-bottom: 15px;">Konu</h3><div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">${subject}</div></div>` : ''}
            <div style="margin: 20px 0;">
              <h3 style="color: #3b82f6; margin-bottom: 15px;">Mesaj</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">${message.replace(/\n/g, '<br>')}</div>
            </div>
            <div style="margin: 20px 0;">
              <h3 style="color: #3b82f6; margin-bottom: 15px;">İletişim Bilgileri</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Ad Soyad:</td><td style="padding: 8px 0; color: #333;">${name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td><td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td><td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #3b82f6;">${phone}</a></td></tr>` : ''}
                ${company ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Şirket:</td><td style="padding: 8px 0; color: #333;">${company}</td></tr>` : ''}
                ${position ? `<tr><td style="padding: 8px 0; font-weight: bold; color: #555;">Pozisyon:</td><td style="padding: 8px 0; color: #333;">${position}</td></tr>` : ''}
              </table>
            </div>
          </div>
          <div style="background: #f8f9fa; padding: 20px; text-align: center; border-top: 1px solid #eee;"><p style="color: #666; margin: 0; font-size: 14px;">Bu e-posta Protek Analitik web sitesinden otomatik olarak gönderilmiştir.</p><p style="color: #666; margin: 5px 0 0 0; font-size: 12px;">Gönderim Tarihi: ${new Date().toLocaleString('tr-TR')}</p></div>
        </div>`;
    }

    const transporter = createTransporter(env);
    
    const mailOptions = {
      from: `"Protek Analitik Website" <${env.GMAIL_USER || env.OUTLOOK_USER}>`,
      to: 'websiteform@protekanalitik.com',
      subject: emailSubject,
      html: emailContent,
      replyTo: email
    };

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ success: true, message: 'Mesajınız başarıyla gönderildi!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Email gönderme hatası:', error);
    return new Response(JSON.stringify({ success: false, message: 'E-posta gönderilirken bir hata oluştu.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
