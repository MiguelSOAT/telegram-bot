export interface IKafkaTelegramVideoPayload {
  file_path: string
  file_id: string
  file_name: string
  file_size: number
  mime_type: string
  update_id: number
  uuid: string
  telegram_token: number
  file_extension: string
  size: number
}

export type IVideoCtx = NarrowedContext<
  Context<Update>,
  {
    message: Update.New &
      Update.NonChannel &
      Message.VideoMessage
    update_id: number
  }
>
