import { Kafka, Producer } from 'kafkajs'
import { Telegraf, Context } from 'telegraf'
import { Update } from 'telegraf/typings/core/types/typegram'

export const forceBotStopWhenProcessIsStopped = (
  bot: Telegraf<Context<Update>>
) => {
  process.once('SIGINT', () => bot.stop('SIGINT'))
  process.once('SIGTERM', () => bot.stop('SIGTERM'))
}

export const initializeKafka =
  async (): Promise<Producer> => {
    const brokerURL =
      process.env.BROKER_URL || 'localhost:9092'
    const kafka = new Kafka({
      clientId: 'kafka-telegram-producer',
      brokers: [brokerURL]
    })

    const producer = kafka.producer()

    await producer.connect()

    return producer
  }
