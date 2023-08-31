import transporter from './nodemailer-config'

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

export async function sendEmail(options: EmailOptions) {
  try {
    const info = await transporter.sendMail({
      from: 'meuemail@gmail.com',
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: options.html,
    })

    console.log('Email enviado:', info.messageId)
  } catch (error) {
    console.error('Erro ao enviar o email', error)
  }
}
