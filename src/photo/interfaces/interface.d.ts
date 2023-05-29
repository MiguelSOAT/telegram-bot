// export interface ITelegramPhotoResponseResult

export interface ITelegramPhotoResponseResult {
  file_id: string
  file_unique_id: string
  width: number
  height: number
}

export interface IKafkaTelegramPhotoPayload {
  file_path: string
  file_id: string
  file_name: string
  file_size: number
  uuid: string
  telegram_token: number
  size: number
  mime_type: string
  file_extension: string
  update_id: number
}
