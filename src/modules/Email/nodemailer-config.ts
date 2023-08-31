import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'meuemail@gmail.com',
    pass: '12321312321',
  },
})

export default transporter
