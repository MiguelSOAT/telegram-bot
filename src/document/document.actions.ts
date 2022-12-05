import { Producer } from 'kafkajs'
import { IDocumentCtx } from '../interface'
import DocumentService from './services/document.service'
import SetKafkaDocumentService from './services/set-kafka-document.service'

export default class DocumentAction {
  static async invoke(
    ctx: IDocumentCtx,
    producer: Producer
  ) {
    console.log('Retrieving document data')

    const documentJobKafka = await DocumentService.execute(
      ctx
    )

    await SetKafkaDocumentService.execute(
      documentJobKafka,
      producer
    )

    console.log(
      'Document data retrieved and setted in kafka'
    )
  }
}
