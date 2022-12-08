import axios from 'axios'
import {
  IDocumentCtx,
  IGetTelegramFileResponse
} from '../../interface'
import DocumentDomain from '../domains/document.domain'
import { v4 as uuidv4 } from 'uuid'

export default class DocumentService {
  public static async execute(
    ctx: IDocumentCtx
  ): Promise<string> {
    const token = process.env.BOT_TOKEN || ''
    const uuid = uuidv4()
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

    console.log('Document data retrieved successfully')

    return kafkaDocumentData.toPayload()
  }
}
