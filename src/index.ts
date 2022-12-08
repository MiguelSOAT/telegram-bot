import { Telegraf } from 'telegraf'
import env from 'dotenv'
import { Kafka, Producer } from 'kafkajs'
// import PhotoService from './photo/services/photo.service'
import DocumentAction from './document/document.actions'
import PhotoAction from './photo/photo.action'

env.config()

// config
const brokerURL = process.env.BROKER_URL || 'localhost:9092'
const kafka = new Kafka({
  clientId: 'kafka-telegram-producer',
  brokers: [brokerURL]
})

const producer = kafka.producer()

const initialize = async (producer: Producer) => {
  await producer.connect()
}

initialize(producer)
// fin config

const bot = new Telegraf(process.env.BOT_TOKEN || '')

bot.start((ctx) => ctx.reply('Hola! Soy un bot de prueba'))

bot.on('document', (ctx) =>
  DocumentAction.invoke(ctx, producer)
)

bot.on('photo', (ctx) => {
  console.log('asdasdas')
  PhotoAction.invoke(ctx, producer)
})

bot.launch()

process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
