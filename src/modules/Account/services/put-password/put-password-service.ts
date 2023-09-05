import readAccountModel from '../../model/read'
import { sendEmail } from '../../../Email/send-email'
import { createTokenService } from '../../../Auth/services/create-token/create-token-service'

class PutPasswordService {
  async initiatePasswordReset(name: string, email: string) {
    try {
      const user = await readAccountModel.findAccountByEmail(email)

      if (!user) {
        return { status: false, error: 'Usuário não encontrado.' }
      }

      const token = createTokenService(name, email)

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
}

export default new PutPasswordService()
