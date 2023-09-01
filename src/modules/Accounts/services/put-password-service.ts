import bcrypt from 'bcrypt'
import { PrismaClient } from '@prisma/client'
import { sendEmail } from '../../Email/send-email'

const prisma = new PrismaClient()

export async function modifyPassword(id: string, newPassword: string) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10)

    await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: hashedPassword,
      },
    })

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    if (user && user.email) {
      await sendEmail({
        to: user.email,
        subject: 'Alteração de Senha',
        text: 'Sua senha foi modificada com sucesso.',
      })

      console.log('Senha modificada com sucesso e email enviado.')
    }

    console.log('Senha modificada com sucesso')
  } catch (error) {
    console.error('Erro ao modificar a senha', error)
  }
}
