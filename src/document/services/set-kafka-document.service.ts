import { Producer } from 'kafkajs'

export default class SetKafkaDocumentService {
  public static async execute(
    documentJob: string,
    producer: Producer
  ): Promise<void> {
    await producer.send({
      topic: 'telegram',
      messages: [
        {
          value: documentJob
        }
      ]
    })
  }
}
