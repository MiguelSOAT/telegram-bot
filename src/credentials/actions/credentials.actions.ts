import Logger from '../../infrastructure/logger'
import { ICredentialsCtx } from '../interfaces/interface'
import CredentialsService from '../services/credentials.service'

export default class CredentialsAction {
  static async invoke(
    ctx: ICredentialsCtx
  ): Promise<string> {
    Logger.info('Retrieving credentials data')

    // TODO: Check if a user already is using this credentials
    const botReplyMessage = CredentialsService.execute(ctx)

    Logger.info('Credentials data retrieved successfully')

    return botReplyMessage
  }
}
