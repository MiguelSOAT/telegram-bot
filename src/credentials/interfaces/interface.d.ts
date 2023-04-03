import { NarrowedContext, Context } from 'telegraf'
import {
  Update,
  Message
} from 'telegraf/typings/core/types/typegram'

export type ICredentialsCtx = NarrowedContext<
  Context<Update>,
  {
    message: Update.New &
      Update.NonChannel &
      Message.TextMessage
    update_id: number
  }
>

export interface ITelegramCredentials {
  telegramId: number
  securityToken: string
}
