import { Telegraf } from 'telegraf'
import env from 'dotenv'
import DocumentAction from './document/actions/document.actions'
import PhotoAction from './photo/actions/photo.action'
import Logger from './infrastructure/logger'
import { message } from 'telegraf/filters'
import {
  forceBotStopWhenProcessIsStopped,
  initializeKafka
} from './utils'
import CredentialsAction from './credentials/actions/credentials.actions'

env.config()

const main = async () => {
  const kafkaProducer = await initializeKafka()

  const bot = new Telegraf(process.env.BOT_TOKEN || '')

  bot.start((ctx) =>
    ctx.reply(
      'Hello! 😎 I am a bot that will help you to sync your photos and documents with http://cloud.miguelsoat.com/ \n\nIf you want to get your credentials, please type /credentials'
    )
  )

  bot.on(message('document'), (ctx) => {
    Logger.info('Received new document for job creation')
    DocumentAction.invoke(ctx, kafkaProducer)
  })

  bot.on(message('photo'), (ctx) => {
    Logger.info('Received new photo for job creation')
    PhotoAction.invoke(ctx, kafkaProducer)
  })

  bot.command('credentials', async (ctx) => {
    const botReply = await CredentialsAction.invoke(ctx)
    ctx.reply(botReply)
  })

  bot.launch()

  forceBotStopWhenProcessIsStopped(bot)
}

main()
