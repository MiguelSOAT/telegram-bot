"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const process_1 = require("process");
const winston_1 = __importDefault(require("winston"));
class Logger {
    static info(message) {
        this.logger.info(this.getData(message));
    }
    static verbose(message, objects) {
        if (process_1.env.ENVIRONMENT === 'development') {
            this.logger.verbose(this.getData(message, objects));
        }
    }
    static error(message, objects) {
        this.logger.error(this.getData(message, objects));
    }
    static getData(message, objects) {
        const data = {
            time: this.timeStamp(),
            message
        };
        if (objects)
            Object.assign(data, objects);
        return data;
    }
    static timeStamp() {
        return new Date().toISOString();
    }
}
exports.default = Logger;
Logger.logger = winston_1.default.createLogger({
    format: winston_1.default.format.json(),
    defaultMeta: { service: 'kafka-telegram-producer' },
    transports: [
        new winston_1.default.transports.File({
            filename: './logs/error.log',
            level: 'error'
        }),
        new winston_1.default.transports.File({
            filename: './logs/combined.log'
        })
    ]
});
