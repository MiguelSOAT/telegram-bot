import { Producer } from 'kafkajs'
import logger from '../../infrastructure/logger'

export default class SetKafkaVideoService {
  public static async execute(
    videoJob: string,
    kafkaProducer: Producer
  ): Promise<void> {
    logger.info('Sending video job to kafka')
    await kafkaProducer.send({
      topic: 'telegram',
      messages: [
        {
          value: videoJob
        }
      ]
    })
  }
}
