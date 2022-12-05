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
const document_service_1 = __importDefault(require("./services/document.service"));
const set_kafka_document_service_1 = __importDefault(require("./services/set-kafka-document.service"));
class DocumentAction {
    static invoke(ctx, producer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('Retrieving document data');
            const documentJobKafka = yield document_service_1.default.execute(ctx);
            yield set_kafka_document_service_1.default.execute(documentJobKafka, producer);
            console.log('Document data retrieved and setted in kafka');
        });
    }
}
exports.default = DocumentAction;
