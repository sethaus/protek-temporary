import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email SMTP transporter oluştur (Gmail veya Outlook)
const createTransporter = () => {
  // Gmail kullanıyorsanız
  if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    })
  }
  
  // Outlook kullanıyorsanız (daha kolay)
  if (process.env.OUTLOOK_USER && process.env.OUTLOOK_PASSWORD) {
    return nodemailer.createTransport({
      service: 'hotmail',
      auth: {
        user: process.env.OUTLOOK_USER,
        pass: process.env.OUTLOOK_PASSWORD,
      },
    })
  }
  
  throw new Error('Email konfigürasyonu bulunamadı')
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const {
      formType,
      subject,
      message,
      name,
      email,
      phone,
      company,
      position,
      // Şikayet ve Öneriler için
      complaintType,
      complaintSubject,
      complaintDetails,
      // Eğitim Talepleri için
      trainingType,
      participantCount,
      preferredDate,
      additionalNotes
    } = body

    let emailContent = ''
    let emailSubject = ''

    // Form türüne göre e-posta içeriğini hazırla
    if (formType === 'complaint') {
      emailSubject = `Şikayet ve Öneri - ${complaintType}: ${complaintSubject}`
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
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Konu Türü:</td>
                  <td style="padding: 8px 0; color: #333;">${complaintType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Konu Başlığı:</td>
                  <td style="padding: 8px 0; color: #333;">${complaintSubject}</td>
                </tr>
              </table>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #dc2626; margin-bottom: 15px;">Detaylı Açıklama</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #dc2626;">
                ${complaintDetails.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #dc2626; margin-bottom: 15px;">İletişim Bilgileri</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Ad Soyad:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #dc2626;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #dc2626;">${phone}</a></td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Şirket:</td>
                  <td style="padding: 8px 0; color: #333;">${company}</td>
                </tr>
                ` : ''}
              </table>
            </div>
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
      `
    } else if (formType === 'training') {
      emailSubject = `Eğitim Talebi - ${trainingType} (${participantCount} kişi)`
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Eğitim Talebi</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Protek Analitik Web Sitesi</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; border-bottom: 2px solid #f59e0b; padding-bottom: 10px;">Eğitim Talep Detayları</h2>
            
            <div style="margin: 20px 0;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Eğitim Türü:</td>
                  <td style="padding: 8px 0; color: #333;">${trainingType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Katılımcı Sayısı:</td>
                  <td style="padding: 8px 0; color: #333;">${participantCount} kişi</td>
                </tr>
                ${preferredDate ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Tercih Edilen Tarih:</td>
                  <td style="padding: 8px 0; color: #333;">${preferredDate}</td>
                </tr>
                ` : ''}
              </table>
            </div>

            ${additionalNotes ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #f59e0b; margin-bottom: 15px;">Ek Notlar</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
                ${additionalNotes.replace(/\n/g, '<br>')}
              </div>
            </div>
            ` : ''}

            <div style="margin: 20px 0;">
              <h3 style="color: #f59e0b; margin-bottom: 15px;">İletişim Bilgileri</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Ad Soyad:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #f59e0b;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #f59e0b;">${phone}</a></td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Şirket:</td>
                  <td style="padding: 8px 0; color: #333;">${company}</td>
                </tr>
                ` : ''}
                ${position ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Pozisyon:</td>
                  <td style="padding: 8px 0; color: #333;">${position}</td>
                </tr>
                ` : ''}
              </table>
            </div>
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
      `
    } else {
      // Genel iletişim formu
      emailSubject = `İletişim Formu - ${subject || 'Genel Talep'}`
      emailContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%); padding: 30px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">İletişim Formu</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Protek Analitik Web Sitesi</p>
          </div>
          
          <div style="padding: 30px; background: white;">
            <h2 style="color: #333; border-bottom: 2px solid #3b82f6; padding-bottom: 10px;">Mesaj Detayları</h2>
            
            ${subject ? `
            <div style="margin: 20px 0;">
              <h3 style="color: #3b82f6; margin-bottom: 15px;">Konu</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                ${subject}
              </div>
            </div>
            ` : ''}

            <div style="margin: 20px 0;">
              <h3 style="color: #3b82f6; margin-bottom: 15px;">Mesaj</h3>
              <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid #3b82f6;">
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>

            <div style="margin: 20px 0;">
              <h3 style="color: #3b82f6; margin-bottom: 15px;">İletişim Bilgileri</h3>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555; width: 150px;">Ad Soyad:</td>
                  <td style="padding: 8px 0; color: #333;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">E-posta:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="mailto:${email}" style="color: #3b82f6;">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Telefon:</td>
                  <td style="padding: 8px 0; color: #333;"><a href="tel:${phone}" style="color: #3b82f6;">${phone}</a></td>
                </tr>
                ` : ''}
                ${company ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Şirket:</td>
                  <td style="padding: 8px 0; color: #333;">${company}</td>
                </tr>
                ` : ''}
                ${position ? `
                <tr>
                  <td style="padding: 8px 0; font-weight: bold; color: #555;">Pozisyon:</td>
                  <td style="padding: 8px 0; color: #333;">${position}</td>
                </tr>
                ` : ''}
              </table>
            </div>
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
      `
    }

    // E-postayı gönder
    // Gmail SMTP ile email gönder
    const transporter = createTransporter()
    
    const mailOptions = {
      from: `"Protek Analitik Website" <${process.env.GMAIL_USER || process.env.OUTLOOK_USER}>`,
      to: 'websiteform@protekanalitik.com',
      subject: emailSubject,
      html: emailContent,
      replyTo: email
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: 'Mesajınız başarıyla gönderildi!'
    })

  } catch (error) {
    console.error('Email gönderme hatası:', error)
    return NextResponse.json(
      { 
        success: false, 
        message: 'E-posta gönderilirken bir hata oluştu. Lütfen tekrar deneyin.' 
      },
      { status: 500 }
    )
  }
}
