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
const telegraf_1 = require("telegraf");
const dotenv_1 = __importDefault(require("dotenv"));
const kafkajs_1 = require("kafkajs");
// import PhotoService from './photo/services/photo.service'
const document_actions_1 = __importDefault(require("./document/document.actions"));
const photo_action_1 = __importDefault(require("./photo/photo.action"));
const logger_1 = __importDefault(require("./infrastructure/logger"));
dotenv_1.default.config();
// config kafka
const brokerURL = process.env.BROKER_URL || 'localhost:9092';
const kafka = new kafkajs_1.Kafka({
    clientId: 'kafka-telegram-producer',
    brokers: [brokerURL]
});
const producer = kafka.producer();
const initialize = (producer) => __awaiter(void 0, void 0, void 0, function* () {
    yield producer.connect();
});
initialize(producer);
// fin config
const bot = new telegraf_1.Telegraf(process.env.BOT_TOKEN || '');
bot.start((ctx) => ctx.reply('Hola! Soy un bot de prueba'));
bot.on('document', (ctx) => {
    logger_1.default.info('Received document for job creation');
    document_actions_1.default.invoke(ctx, producer);
});
bot.on('photo', (ctx) => {
    logger_1.default.info('Received photo for job creation');
    photo_action_1.default.invoke(ctx, producer);
});
bot.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
