import { Producer } from 'kafkajs'
import { IPhotoCtx } from '../interface'
import PhotoService from './services/photo.service'
import SetKafkaPhotoService from './services/set-kafka-document.service'

export default class PhotoAction {
  static async invoke(ctx: IPhotoCtx, producer: Producer) {
    console.log('Retrieving photo data')
    const photoJobsKafka: string[] =
      await PhotoService.execute(ctx)

    await SetKafkaPhotoService.execute(
      photoJobsKafka,
      producer
    )

    console.log('Photo data retrieved and setted in kafka')
  }
}
