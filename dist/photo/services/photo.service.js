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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const photo_domain_1 = __importDefault(require("../domains/photo.domain"));
const uuid_1 = require("uuid");
class PhotoService {
    static execute(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = process.env.BOT_TOKEN || '';
            const kafkaPhotoDataArray = [];
            const uuid = (0, uuid_1.v4)();
            const photos = ctx.message.photo;
            const indexToRetrieve = this.getPhotosIndexToRetrieve(photos);
            // ctx.replyWithSticker('\xF0\x9F\x98\x89')
            for (const index of indexToRetrieve) {
                const photo = photos[index];
                const response = yield axios_1.default.get(`https://api.telegram.org/bot${token}/getfile?file_id=${photo.file_id}`);
                const telegramPhoto = response.data;
                const kafkaPhotoData = new photo_domain_1.default(photo, telegramPhoto, uuid);
                kafkaPhotoDataArray.push(kafkaPhotoData.toPayload());
            }
            return kafkaPhotoDataArray;
        });
    }
    static getPhotosIndexToRetrieve(photos) {
        const photosIndexToRetrieve = [];
        if (photos.length > 0) {
            photosIndexToRetrieve.push(0);
        }
        if (photos.length > 1) {
            photosIndexToRetrieve.push(1);
        }
        if (photos.length > 2) {
            photosIndexToRetrieve.push(photos.length - 1);
        }
        return photosIndexToRetrieve;
    }
}
exports.default = PhotoService;
