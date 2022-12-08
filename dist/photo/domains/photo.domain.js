"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PhotoDomain {
    constructor(photo, telegramPhoto, uuid) {
        const fileName = `${uuid}_${photo.width}x${photo.height}.jpg`;
        this.file_path = telegramPhoto.result.file_path;
        this.file_id = telegramPhoto.result.file_id;
        this.file_name = fileName || '';
        this.file_size = telegramPhoto.result.file_size || 0;
        this.uuid = uuid;
    }
    toPayload() {
        return JSON.stringify(this);
    }
}
exports.default = PhotoDomain;
