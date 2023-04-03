import { MongoClient } from 'mongodb'

export default class MongoDB {
  static async connect() {
    const client = new MongoClient(
      process.env.MONGODB_URI || '',
      {}
    )
    await client.connect()
    return client
  }

  static async disconnect(client: MongoClient) {
    await client.close()
  }
}
