import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { type, ...formData } = body;

    // Validate environment variables
    if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
      console.error('Gmail credentials are not set in environment variables.');
      return NextResponse.json({ message: 'Server configuration error.' }, { status: 500 });
    }

    // Create a transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    let mailOptions;
    const recipientEmail = 'info@protekanalitik.com'; // The email address that receives the form submissions

    if (type === 'contact') {
      // Handle General Contact Form
      const { name, email, subject, message } = formData;
      if (!name || !email || !subject || !message) {
        return NextResponse.json({ message: 'Missing required fields for contact form.' }, { status: 400 });
      }
      mailOptions = {
        from: `\"${name}\" <${process.env.GMAIL_USER}>`,
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
      // Handle Quote Request Form
      const {
        quoteType, category, subcategory, customRequirement,
        projectDetails, budget, timeline,
        companyName, contactPerson, email, phone, position
      } = formData;

       if (!companyName || !contactPerson || !email || !phone) {
        return NextResponse.json({ message: 'Missing required fields for quote form.' }, { status: 400 });
      }

      mailOptions = {
        from: `\"${contactPerson}\" <${process.env.GMAIL_USER}>`,
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
      return NextResponse.json({ message: 'Invalid form type specified.' }, { status: 400 });
    }

    // Send mail with defined transport object
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Email sent successfully!' }, { status: 200 });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email.' }, { status: 500 });
  }
}
