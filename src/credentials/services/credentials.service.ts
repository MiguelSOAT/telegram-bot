import Logger from '../../infrastructure/logger'
import {
  ICredentialsCtx,
  ITelegramCredentials
} from '../interfaces/interface'
import MongoDB from '../../infrastructure/mongodb'
import { MongoClient } from 'mongodb'
import CredentialsDomain from '../domains/credentials.domain'

export default class CredentialsService {
  public static async execute(
    ctx: ICredentialsCtx
  ): Promise<string> {
    const mongoClient: MongoClient = await MongoDB.connect()
    const mongoCollection = mongoClient
      .db('telegram')
      .collection<ITelegramCredentials>('credentials')

    const credentials = new CredentialsDomain(ctx)

    await mongoCollection.updateOne(
      {
        telegramId: ctx.from.id
      },
      {
        $set: {
          securityToken: credentials.securityToken
        }
      },
      {
        upsert: true
      }
    )

    Logger.info('Document data retrieved successfully')

    return credentials.toString()
  }
}
