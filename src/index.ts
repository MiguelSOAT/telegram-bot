import { Telegraf } from 'telegraf'
import env from 'dotenv'
// import PhotoService from './photo/services/photo.service'
import DocumentAction from './document/actions/document.actions'
import PhotoAction from './photo/actions/photo.action'
import Logger from './infrastructure/logger'
import { message } from 'telegraf/filters'
import {
  forceBotStopWhenProcessIsStopped,
  initializeKafka
} from './utils'

env.config()

const main = async () => {
  const kafkaProducer = await initializeKafka()

  const bot = new Telegraf(process.env.BOT_TOKEN || '')

  bot.start((ctx) =>
    ctx.reply('Hola! Soy un bot de prueba')
  )

  bot.on(message('document'), (ctx) => {
    Logger.info('Received new document for job creation')
    DocumentAction.invoke(ctx, kafkaProducer)
  })

  bot.on(message('photo'), (ctx) => {
    Logger.info('Received new photo for job creation')
    PhotoAction.invoke(ctx, kafkaProducer)
  })

  bot.launch()

  forceBotStopWhenProcessIsStopped(bot)
}

main()
