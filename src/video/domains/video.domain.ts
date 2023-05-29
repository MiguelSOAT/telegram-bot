import { IGetTelegramFileResponse } from '../../interface'
import {
  IKafkaTelegramVideoPayload,
  IVideoCtx
} from '../interfaces/interface'

export default class VideoDomain
  implements IKafkaTelegramVideoPayload
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
    ctx: IVideoCtx,
    telegramVideo: IGetTelegramFileResponse,
    uuid: string
  ) {
    this.file_path = telegramVideo.result.file_path
    this.file_id = ctx.message.video.file_id
    this.file_name = ctx.message.video.file_name || ''
    this.file_size = ctx.message.video.file_size || 0
    this.mime_type = ctx.message.video.mime_type || ''
    this.update_id = ctx.update.update_id || 0
    this.file_extension = ctx.message.video.file_name
      ? ctx.message.video.file_name.split('.').pop() || ''
      : ''
    this.uuid = uuid
    this.telegram_token = ctx.from.id
  }

  public toPayload(): string {
    return JSON.stringify(this)
  }
}
