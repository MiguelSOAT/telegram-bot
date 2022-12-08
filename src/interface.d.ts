import { NarrowedContext, Context } from 'telegraf'
import {
  Update,
  Message
} from 'telegraf/typings/core/types/typegram'

export type IDocumentCtx = NarrowedContext<
  Context<Update>,
  {
    message:
      | (Update.New &
          Update.NonChannel &
          Message.AnimationMessage)
      | (Update.New &
          Update.NonChannel &
          Message.DocumentMessage)
    update_id: number
  }
>

export type IPhotoCtx = NarrowedContext<
  Context<Update>,
  {
    message: Update.New &
      Update.NonChannel &
      Message.PhotoMessage
    update_id: number
  }
>

export interface ITelegramFileResponseResult {
  file_id: string
  file_unique_id: string
  file_size: number
  file_path: string
}

export interface IGetTelegramFileResponse {
  ok: boolean
  result: ITelegramFileResponseResult
}
