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
const document_domain_1 = __importDefault(require("../domains/document.domain"));
const uuid_1 = require("uuid");
class DocumentService {
    static execute(ctx) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = process.env.BOT_TOKEN || '';
            const uuid = (0, uuid_1.v4)();
            const response = yield axios_1.default.get(`https://api.telegram.org/bot${token}/getfile?file_id=${ctx.message.document.file_id}`);
            const telegramDocument = response.data;
            const kafkaDocumentData = new document_domain_1.default(ctx, telegramDocument, uuid);
            console.log('Document data retrieved successfully');
            return kafkaDocumentData.toPayload();
        });
    }
}
exports.default = DocumentService;
