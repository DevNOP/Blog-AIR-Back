import { verifyTokenService } from '../../../Auth/services/verify-token/verify-token-service'
import readAccountModel from '../../model/read'
import bcrypt from 'bcrypt'
import { prisma } from '../../../Prisma/index'
import { sendEmail } from '../../../Email/send-email'
import { createTokenService } from '../../../Auth/services/create-token/create-token-service'

class PutResetPasswordService {
  async initiatePasswordReset(name: string, email: string) {
    try {
      const user = await readAccountModel.findAccountByEmail(email)

      if (!user) {
        return { status: false, error: 'Usuário não encontrado.' }
      }

      const token = createTokenService(name, email, '30m', 'user')

      const resetPasswordLink = `https://spiderlinkers.com/reset-password?${token}`

      await sendEmail({
        to: email,
        subject: 'Redefinir Senha',
        text: `Clique no link a seguir para redefinir sua senha: ${resetPasswordLink}`,
      })

      return { status: true, message: 'E-mail enviado com sucesso.' }
    } catch (error) {
      console.error('Erro ao iniciar a redefinição de senha:', error)
      return { status: false, error: 'Erro interno do servidor.' }
    }
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = verifyTokenService(token) as { email?: string }

      if (!decoded.email) {
        return { status: false, error: 'Token inválido' }
      }

      const user = await readAccountModel.findAccountByEmail(decoded.email)

      if (!user) {
        return { status: false, error: 'Usuário não encontrado.' }
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10)

      await prisma.user.update({
        where: { id: user?.id },
        data: { password: hashedPassword },
      })

      await sendEmail({
        to: decoded.email,
        subject: 'Senha redefinida com sucesso',
        text: 'Sua senha foi alterada com sucesso, agora aproveite nosso site',
      })

      return { status: true, message: 'Senha redefinida com sucesso.' }
    } catch (error) {
      console.error('Erro ao redefinir a senha', error)
      return { status: false, error: 'Erro interno do servidor.' }
    }
  }
}

export default new PutResetPasswordService()
