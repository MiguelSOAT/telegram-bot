export interface ITelegramDocumentResponseResult {
  file_id: string
  file_unique_id: string
  file_size: number
  file_path: string
}

export interface IGetTelegramDocumentResponse {
  ok: boolean
  result: ITelegramDocumentResponseResult
}

export interface IKafkaTelegramDocumentPayload {
  file_path: string
  file_id: string
  file_name: string
  file_size: number
  mime_type: string
  update_id: number
}
