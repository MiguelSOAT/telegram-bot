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
