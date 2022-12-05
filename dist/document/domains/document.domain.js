"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class DocumentDomain {
    constructor(ctx, telegramDocument) {
        this.file_path = telegramDocument.result.file_path;
        this.file_id = ctx.message.document.file_id;
        this.file_name = ctx.message.document.file_name || '';
        this.file_size = ctx.message.document.file_size || 0;
        this.mime_type = ctx.message.document.mime_type || '';
        this.update_id = ctx.update.update_id || 0;
    }
    toPayload() {
        return JSON.stringify(this);
    }
}
exports.default = DocumentDomain;
