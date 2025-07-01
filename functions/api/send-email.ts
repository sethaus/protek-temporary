import nodemailer from 'nodemailer';

interface FormData {
  type: 'contact' | 'quote' | 'complaint' | 'training';
  [key: string]: any;
}

export const onRequestPost: PagesFunction<{ GMAIL_USER: string; GMAIL_APP_PASSWORD: string; }> = async (context) => {
  try {
    const { request, env } = context;
    const body: FormData = await request.json();
    const { GMAIL_USER, GMAIL_APP_PASSWORD } = env;

    if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
      return new Response(JSON.stringify({ success: false, message: 'E-posta sunucu ayarları eksik.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
    });

    let subject = '';
    let htmlBody = '';
    let replyTo = body.email;
    const recipientEmail = 'info@protekanalitik.com';

    switch (body.type) {
      case 'contact':
        subject = `Yeni İletişim Formu Mesajı: ${body.name}`;
        htmlBody = `
          <h3>Yeni Bir İletişim Formu Mesajınız Var</h3>
          <p><strong>Ad Soyad:</strong> ${body.name}</p>
          <p><strong>E-posta:</strong> ${body.email}</p>
          <p><strong>Telefon:</strong> ${body.phone}</p>
          <p><strong>Mesaj:</strong></p>
          <p>${body.message}</p>
        `;
        break;

      case 'quote':
        subject = `Yeni Teklif Talebi: ${body.company || body.name}`;
        htmlBody = `
          <h3>Yeni Bir Teklif Talebiniz Var</h3>
          <p><strong>Ad Soyad:</strong> ${body.name}</p>
          <p><strong>Firma Adı:</strong> ${body.company}</p>
          <p><strong>E-posta:</strong> ${body.email}</p>
          <p><strong>Telefon:</strong> ${body.phone}</p>
          <hr>
          <h4>Talep Detayları:</h4>
          <pre>${JSON.stringify(body.stepData, null, 2)}</pre>
        `;
        break;

      case 'complaint':
        subject = `Yeni Şikayet/Öneri Formu: ${body.complaintSubject}`;
        htmlBody = `
          <h3>Yeni Bir Şikayet/Öneri Formu Aldınız</h3>
          <p><strong>Gönderen:</strong> ${body.name}</p>
          <p><strong>Firma:</strong> ${body.company}</p>
          <p><strong>E-posta:</strong> ${body.email}</p>
          <p><strong>Telefon:</strong> ${body.phone}</p>
          <hr>
          <p><strong>Form Tipi:</strong> ${body.complaintType}</p>
          <p><strong>Konu:</strong> ${body.complaintSubject}</p>
          <p><strong>Detaylar:</strong></p>
          <p>${body.complaintDetails}</p>
        `;
        break;

      case 'training':
        subject = `Yeni Eğitim Talebi: ${body.trainingType}`;
        htmlBody = `
          <h3>Yeni Bir Eğitim Talebi Aldınız</h3>
          <p><strong>Gönderen:</strong> ${body.name}</p>
          <p><strong>Unvan:</strong> ${body.position}</p>
          <p><strong>Firma:</strong> ${body.company}</p>
          <p><strong>E-posta:</strong> ${body.email}</p>
          <p><strong>Telefon:</strong> ${body.phone}</p>
          <hr>
          <p><strong>Talep Edilen Eğitim:</strong> ${body.trainingType}</p>
          <p><strong>Katılımcı Sayısı:</strong> ${body.participantCount}</p>
          <p><strong>Tercih Edilen Tarih:</strong> ${body.preferredDate}</p>
          <p><strong>Ek Notlar:</strong></p>
          <p>${body.additionalNotes}</p>
        `;
        break;

      default:
        return new Response(JSON.stringify({ success: false, message: 'Geçersiz form tipi.' }), {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        });
    }

    await transporter.sendMail({
      from: `"Protek Analitik Web" <${GMAIL_USER}>`,
      to: recipientEmail,
      replyTo: replyTo,
      subject: subject,
      html: htmlBody,
    });

    return new Response(JSON.stringify({ success: true, message: 'E-posta başarıyla gönderildi.' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('E-posta gönderme hatası:', error);
    return new Response(JSON.stringify({ success: false, message: 'Sunucu hatası. Lütfen daha sonra tekrar deneyin.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
