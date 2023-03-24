import {
  IGetTelegramFileResponse,
  IPhotoCtx
} from '../../interface'
import {
  IKafkaTelegramPhotoPayload,
  ITelegramPhotoResponseResult
} from '../interfaces/interface'

export default class PhotoDomain
  implements IKafkaTelegramPhotoPayload
{
  public file_path: string
  public file_id: string
  public file_name: string
  public file_size: number
  public uuid: string
  public telegram_token: number
  public size: number
  mime_type = 'image/jpg'
  file_extension = 'jpg'

  constructor(
    ctx: IPhotoCtx,
    photo: ITelegramPhotoResponseResult,
    telegramPhoto: IGetTelegramFileResponse,
    uuid: string,
    size: number
  ) {
    const fileName = `${uuid}_${photo.width}x${photo.height}.jpg`
    this.file_path = telegramPhoto.result.file_path
    this.file_id = telegramPhoto.result.file_id
    this.file_name = fileName || ''
    this.file_size = telegramPhoto.result.file_size || 0
    this.uuid = uuid
    this.telegram_token = ctx.from.id
    this.size = size
  }

  public toPayload(): string {
    return JSON.stringify(this)
  }
}
