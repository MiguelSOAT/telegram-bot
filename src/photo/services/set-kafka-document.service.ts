import { Producer } from 'kafkajs'

export default class SetKafkaPhotoService {
  public static async execute(
    photoJobs: string[],
    producer: Producer
  ): Promise<void> {
    for (const photoJob of photoJobs) {
      await producer.send({
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
