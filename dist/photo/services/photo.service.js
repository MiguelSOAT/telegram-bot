"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhotoService = void 0;
// import PhotoDomain from './photo.domain'
// import { IGetTelegramDocumentResponse } from '../interface'
const PhotoService = (ctx, producer) => __awaiter(void 0, void 0, void 0, function* () {
    const token = process.env.BOT_TOKEN || '';
    console.log(JSON.stringify(ctx));
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
    console.log('Document data retrieved and setted in kafka');
});
exports.PhotoService = PhotoService;
