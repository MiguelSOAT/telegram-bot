import {
  IDocumentCtx,
  IGetTelegramFileResponse
} from '../../interface'
import { IKafkaTelegramDocumentPayload } from '../interfaces/interface'

export default class DocumentDomain
  implements IKafkaTelegramDocumentPayload
{
  public file_path: string
  public file_id: string
  public file_name: string
  public file_size: number
  public mime_type: string
  public update_id: number
  public uuid: string
  public telegram_token: number
  public file_extension: string
  public size = 0

  constructor(
    ctx: IDocumentCtx,
    telegramDocument: IGetTelegramFileResponse,
    uuid: string
  ) {
    this.file_path = telegramDocument.result.file_path
    this.file_id = ctx.message.document.file_id
    this.file_name = ctx.message.document.file_name || ''
    this.file_size = ctx.message.document.file_size || 0
    this.mime_type = ctx.message.document.mime_type || ''
    this.update_id = ctx.update.update_id || 0
    this.file_extension = ctx.message.document.file_name
      ? ctx.message.document.file_name.split('.').pop() ||
        ''
      : ''
    this.uuid = uuid
    this.telegram_token = ctx.from.id
  }

  public toPayload(): string {
    return JSON.stringify(this)
  }
}
