import axios from 'axios'
import {
  IGetTelegramFileResponse,
  IPhotoCtx
} from '../../interface'
import PhotoDomain from '../domains/photo.domain'
import { ITelegramPhotoResponseResult } from '../interface'
import { v4 as uuidv4 } from 'uuid'

export default class PhotoService {
  public static async execute(
    ctx: IPhotoCtx
  ): Promise<string[]> {
    const token = process.env.BOT_TOKEN || ''
    const kafkaPhotoDataArray: string[] = []
    const uuid = uuidv4()

    const photos: ITelegramPhotoResponseResult[] =
      ctx.message.photo
    const indexToRetrieve: number[] =
      this.getPhotosIndexToRetrieve(photos)
    // ctx.replyWithSticker('\xF0\x9F\x98\x89')
    for (const index of indexToRetrieve) {
      const photo: ITelegramPhotoResponseResult =
        photos[index]
      const response = await axios.get(
        `https://api.telegram.org/bot${token}/getfile?file_id=${photo.file_id}`
      )

      const telegramPhoto: IGetTelegramFileResponse =
        response.data

      const kafkaPhotoData: PhotoDomain = new PhotoDomain(
        photo,
        telegramPhoto,
        uuid
      )

      kafkaPhotoDataArray.push(kafkaPhotoData.toPayload())
    }

    return kafkaPhotoDataArray
  }

  public static getPhotosIndexToRetrieve(
    photos: ITelegramPhotoResponseResult[]
  ): number[] {
    const photosIndexToRetrieve: number[] = []

    if (photos.length > 0) {
      photosIndexToRetrieve.push(0)
    }

    if (photos.length > 1) {
      photosIndexToRetrieve.push(1)
    }

    if (photos.length > 2) {
      photosIndexToRetrieve.push(photos.length - 1)
    }

    return photosIndexToRetrieve
  }
}
