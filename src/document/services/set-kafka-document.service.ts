import { Producer } from 'kafkajs'
import logger from '../../infrastructure/logger'

export default class SetKafkaDocumentService {
  public static async execute(
    documentJob: string,
    kafkaProducer: Producer
  ): Promise<void> {
    logger.info('Sending document job to kafka')
    await kafkaProducer.send({
      topic: 'telegram',
      messages: [
        {
          value: documentJob
        }
      ]
    })
  }
}
