import { Producer } from 'kafkajs'
import Logger from '../../infrastructure/logger'
import { IPhotoCtx } from '../../interface'
import PhotoService from '../services/photo.service'
import SetKafkaPhotoService from '../services/set-kafka-document.service'

export default class PhotoAction {
  static async invoke(
    ctx: IPhotoCtx,
    kafkaProducer: Producer
  ) {
    Logger.info('Retrieving photo data')
    const photoJobsKafka: string[] =
      await PhotoService.execute(ctx)

    await SetKafkaPhotoService.execute(
      photoJobsKafka,
      kafkaProducer
    )

    Logger.info('Photo data retrieved and setted in kafka')
  }
}
