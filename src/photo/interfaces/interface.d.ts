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
  user_id: number
}
