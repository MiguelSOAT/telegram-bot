import axios from 'axios'
import {
  IDocumentCtx,
  IGetTelegramFileResponse
} from '../../interface'
import DocumentDomain from '../domains/document.domain'
import { v4 as uuidv4 } from 'uuid'
import Logger from '../../infrastructure/logger'

export default class DocumentService {
  public static async execute(
    ctx: IDocumentCtx
  ): Promise<string> {
    const token = process.env.BOT_TOKEN || ''
    const uuid = uuidv4()

    try {
      const response = await axios.get(
        `https://api.telegram.org/bot${token}/getfile?file_id=${ctx.message.document.file_id}`
      )

      const telegramDocument: IGetTelegramFileResponse =
        response.data
      const kafkaDocumentData = new DocumentDomain(
        ctx,
        telegramDocument,
        uuid
      )

      Logger.info('Document data retrieved successfully')

      ctx.reply('✅', {
        reply_to_message_id: ctx.message.message_id
      })

      return kafkaDocumentData.toPayload()
    } catch (error: any) {
      ctx.reply(
        '❌ File is too big 🙁. The size limit set by Telegram is 20MB for chat bots.',
        {
          reply_to_message_id: ctx.message.message_id
        }
      )
      Logger.error('Error while retrieving document', {
        error: error
      })

      throw new Error('Error retrieving document data')
    }
  }
}
