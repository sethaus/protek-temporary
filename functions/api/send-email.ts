import nodemailer from 'nodemailer';

// Define the expected structure for form data
interface FormData {
  type: 'contact' | 'quote';
  [key: string]: any;
}

// Define the Cloudflare Pages function handler
export const onRequestPost: PagesFunction<{ GMAIL_USER: string; GMAIL_APP_PASSWORD: string }> = async (context) => {
  try {
    const { request, env } = context;
    const body: FormData = await request.json();
    const { type, ...formData } = body;

    // Ensure environment variables are set in Cloudflare dashboard
    if (!env.GMAIL_USER || !env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials are not set in Cloudflare environment variables.');
      return new Response(JSON.stringify({ message: 'Server configuration error.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: env.GMAIL_USER,
        pass: env.GMAIL_APP_PASSWORD,
      },
    });

    let mailOptions;
    const recipientEmail = 'info@protekanalitik.com';

    if (type === 'contact') {
      const { name, email, subject, message } = formData;
      if (!name || !email || !subject || !message) {
        return new Response(JSON.stringify({ message: 'Missing required fields for contact form.' }), { status: 400 });
      }
      mailOptions = {
        from: `\"${name}\" <${env.GMAIL_USER}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `Yeni İletişim Formu Mesajı: ${subject}`,
        html: `
          <h1>Yeni İletişim Formu Mesajı</h1>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Konu:</strong> ${subject}</p>
          <hr>
          <h2>Mesaj:</h2>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };
    } else if (type === 'quote') {
      const {
        quoteType, category, subcategory, customRequirement,
        projectDetails, budget, timeline,
        companyName, contactPerson, email, phone, position
      } = formData;
      if (!companyName || !contactPerson || !email || !phone) {
        return new Response(JSON.stringify({ message: 'Missing required fields for quote form.' }), { status: 400 });
      }
      mailOptions = {
        from: `\"${contactPerson}\" <${env.GMAIL_USER}>`,
        to: recipientEmail,
        replyTo: email,
        subject: `Yeni Teklif Talebi: ${quoteType === 'product' ? 'Ürün Teklifi' : 'Çözüm Paketi'}`,
        html: `
          <h1>Yeni Teklif Talebi</h1>
          <h2>Aşama 1: İhtiyaç Tespiti</h2>
          <p><strong>Teklif Türü:</strong> ${quoteType === 'product' ? 'Ürün Teklifi' : 'Çözüm Paketi'}</p>
          <p><strong>Kategori:</strong> ${category || 'Belirtilmedi'}</p>
          <p><strong>Alt Kategori/Ürün:</strong> ${subcategory || 'Belirtilmedi'}</p>
          <p><strong>Özel Gereksinim:</strong> ${customRequirement ? customRequirement.replace(/\n/g, '<br>') : 'Yok'}</p>
          <hr>
          <h2>Aşama 2: Proje Detayları</h2>
          <p><strong>Proje Detayları:</strong> ${projectDetails.replace(/\n/g, '<br>')}</p>
          <p><strong>Bütçe Aralığı:</strong> ${budget}</p>
          <p><strong>Zaman Planı:</strong> ${timeline}</p>
          <hr>
          <h2>Aşama 3: İletişim Bilgileri</h2>
          <p><strong>Firma Adı:</strong> ${companyName}</p>
          <p><strong>Yetkili Kişi:</strong> ${contactPerson}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Pozisyon:</strong> ${position || 'Belirtilmedi'}</p>
        `,
      };
    } else {
      return new Response(JSON.stringify({ message: 'Invalid form type specified.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    await transporter.sendMail(mailOptions);

    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send email.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
