import axios from 'axios'
import { IDocumentCtx } from '../../interface'
import DocumentDomain from '../domains/document.domain'
import { IGetTelegramDocumentResponse } from '../interface'

export default class DocumentService {
  public static async execute(
    ctx: IDocumentCtx
  ): Promise<string> {
    const token = process.env.BOT_TOKEN || ''
    console.log('Retrieving document data')

    const response = await axios.get(
      `https://api.telegram.org/bot${token}/getfile?file_id=${ctx.message.document.file_id}`
    )

    const telegramDocument: IGetTelegramDocumentResponse =
      response.data

    const kafkaDocumentData = new DocumentDomain(
      ctx,
      telegramDocument
    )

    console.log('Document data retrieved successfully')

    return kafkaDocumentData.toPayload()
  }
}
