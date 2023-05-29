import axios from 'axios'
import {
  // IVideoCtx,
  IGetTelegramFileResponse
} from '../../interface'
import VideoDomain from '../domains/video.domain'
import { v4 as uuidv4 } from 'uuid'
import Logger from '../../infrastructure/logger'
import { IVideoCtx } from '../interfaces/interface'

export default class VideoService {
  public static async execute(
    ctx: IVideoCtx
  ): Promise<string> {
    const token = process.env.BOT_TOKEN || ''
    const uuid = uuidv4()

    try {
      const response = await axios.get(
        `https://api.telegram.org/bot${token}/getfile?file_id=${ctx.message.video.file_id}`
      )

      const telegramVideo: IGetTelegramFileResponse =
        response.data
      const kafkaVideoData = new VideoDomain(
        ctx,
        telegramVideo,
        uuid
      )

      Logger.info('Video data retrieved successfully')

      ctx.reply('✅', {
        reply_to_message_id: ctx.message.message_id
      })

      return kafkaVideoData.toPayload()
    } catch (error: any) {
      ctx.reply(
        '❌ File is too big 🙁. The size limit set by Telegram is 20MB',
        {
          reply_to_message_id: ctx.message.message_id
        }
      )
      Logger.error('Error while retrieving video', {
        error: error
      })

      throw new Error('Error retrieving video data')
    }
  }
}
