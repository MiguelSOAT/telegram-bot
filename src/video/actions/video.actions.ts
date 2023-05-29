import { Producer } from 'kafkajs'
import Logger from '../../infrastructure/logger'
import VideoService from '../services/video.service'
import SetKafkaVideoService from '../services/set-kafka-video.service'
import { IVideoCtx } from '../interfaces/interface'

export default class VideoAction {
  static async invoke(
    ctx: IVideoCtx,
    kafkaProducer: Producer
  ) {
    Logger.info('Retrieving video data')

    const videoJobKafka = await VideoService.execute(ctx)

    await SetKafkaVideoService.execute(
      videoJobKafka,
      kafkaProducer
    )

    Logger.info('Video data retrieved and setted in kafka')
  }
}
