import { Producer } from 'kafkajs'
import Logger from '../infrastructure/logger'
import { IDocumentCtx } from '../interface'
import DocumentService from './services/document.service'
import SetKafkaDocumentService from './services/set-kafka-document.service'

export default class DocumentAction {
  static async invoke(
    ctx: IDocumentCtx,
    producer: Producer
  ) {
    Logger.info('Retrieving document data')

    const documentJobKafka = await DocumentService.execute(
      ctx
    )

    await SetKafkaDocumentService.execute(
      documentJobKafka,
      producer
    )

    Logger.info(
      'Document data retrieved and setted in kafka'
    )
  }
}
