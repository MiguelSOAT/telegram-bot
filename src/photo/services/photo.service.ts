import axios from 'axios'
import {
  IGetTelegramFileResponse,
  IPhotoCtx
} from '../../interface'
import PhotoDomain from '../domains/photo.domain'
import { ITelegramPhotoResponseResult } from '../interfaces/interface'
import { v4 as uuidv4 } from 'uuid'
import { loggers } from 'winston'
import logger from '../../infrastructure/logger'

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

    logger.info('Index to retrieve')
    for (const index of indexToRetrieve) {
      const photo: ITelegramPhotoResponseResult =
        photos[index]
      const response = await axios.get(
        `https://api.telegram.org/bot${token}/getfile?file_id=${photo.file_id}`
      )
      logger.info('Retrieved photo data from telegram')
      const telegramPhoto: IGetTelegramFileResponse =
        response.data

      const size = index + 1
      const kafkaPhotoData: PhotoDomain = new PhotoDomain(
        ctx,
        photo,
        telegramPhoto,
        uuid,
        size
      )

      kafkaPhotoDataArray.push(kafkaPhotoData.toPayload())
    }

    ctx.reply('✅', {
      reply_to_message_id: ctx.message.message_id
    })

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
