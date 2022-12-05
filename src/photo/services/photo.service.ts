import axios from 'axios'
import { Producer } from 'kafkajs'
import { IPhotoCtx } from '../../interface'
// import PhotoDomain from './photo.domain'
// import { IGetTelegramDocumentResponse } from '../interface'

export const PhotoService = async (
  ctx: IPhotoCtx,
  producer: Producer
) => {
  const token = process.env.BOT_TOKEN || ''
  console.log(JSON.stringify(ctx))

  // const response = await axios.get(
  //   `https://api.telegram.org/bot${token}/getfile?file_id=${ctx.message.document.file_id}`
  // )

  // const telegramPhoto: IGetTelegramDocumentResponse =
  //   response.data

  // console.log(JSON.stringify(telegramPhoto))

  // const kafkaDocumentData = new PhotoDomain(
  //   ctx,
  //   telegramPhoto
  // )
  // const payload = kafkaDocumentData.toPayload()
  // await producer.send({
  //   topic: 'telegram',
  //   messages: [
  //     {
  //       value: payload
  //     }
  //   ]
  // })

  // console.log(payload)
  console.log('Document data retrieved and setted in kafka')
}
