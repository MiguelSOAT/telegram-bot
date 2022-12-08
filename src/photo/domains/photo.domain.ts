import { IGetTelegramFileResponse } from '../../interface'
import {
  IKafkaTelegramPhotoPayload,
  ITelegramPhotoResponseResult
} from '../interface'

export default class PhotoDomain
  implements IKafkaTelegramPhotoPayload
{
  public file_path: string
  public file_id: string
  public file_name: string
  public file_size: number
  public uuid: string

  constructor(
    photo: ITelegramPhotoResponseResult,
    telegramPhoto: IGetTelegramFileResponse,
    uuid: string
  ) {
    const fileName = `${uuid}_${photo.width}x${photo.height}.jpg`
    this.file_path = telegramPhoto.result.file_path
    this.file_id = telegramPhoto.result.file_id
    this.file_name = fileName || ''
    this.file_size = telegramPhoto.result.file_size || 0
    this.uuid = uuid
  }

  public toPayload(): string {
    return JSON.stringify(this)
  }
}
