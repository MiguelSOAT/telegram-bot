import { Producer } from 'kafkajs'
import logger from '../../infrastructure/logger'

export default class SetKafkaPhotoService {
  public static async execute(
    photoJobs: string[],
    kafkaProducer: Producer
  ): Promise<void> {
    for (const photoJob of photoJobs) {
      logger.info('Sending photo job to kafka')

      await kafkaProducer.send({
        topic: 'telegram',
        messages: [
          {
            value: photoJob
          }
        ]
      })
    }
  }
}
