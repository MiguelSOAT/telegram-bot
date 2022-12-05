import { IDocumentCtx } from '../../interface'
import {
  IKafkaTelegramDocumentPayload,
  IGetTelegramDocumentResponse
} from '../interface'

export default class DocumentDomain
  implements IKafkaTelegramDocumentPayload
{
  public file_path: string
  public file_id: string
  public file_name: string
  public file_size: number
  public mime_type: string
  public update_id: number

  constructor(
    ctx: IDocumentCtx,
    telegramDocument: IGetTelegramDocumentResponse
  ) {
    this.file_path = telegramDocument.result.file_path
    this.file_id = ctx.message.document.file_id
    this.file_name = ctx.message.document.file_name || ''
    this.file_size = ctx.message.document.file_size || 0
    this.mime_type = ctx.message.document.mime_type || ''
    this.update_id = ctx.update.update_id || 0
  }

  public toPayload(): string {
    return JSON.stringify(this)
  }
}
