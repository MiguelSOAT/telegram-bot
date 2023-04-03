import {
  ICredentialsCtx,
  ITelegramCredentials
} from '../interfaces/interface'

export default class CredentialsDomain
  implements ITelegramCredentials
{
  public telegramId: number
  public securityToken: string

  constructor(ctx: ICredentialsCtx) {
    this.telegramId = ctx.from.id
    this.securityToken = Math.random()
      .toString(36)
      .substring(7)
  }

  public toString(): string {
    return `🥷 Please, for security do not share this information! \n\nTelegram ID: ${this.telegramId}\nSecurity Token: ${this.securityToken}`
  }
}
