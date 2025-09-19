import type { Req, Res } from '@/types/http'
import { CatBotService } from '@/api/catBot/catBot.service'
import { sendResponse } from '@/helper/response'
import {
  methodSchema,
  methodValidator,
  RequestMethods,
} from '@/util/methodValidator'
import { CatBotPayloadSchema } from '@/types/common'
import { parseJsonBody } from '@/util/requestParser'

export async function catBot(req: Req, res: Res) {
  const { method } = req
  const parsedBody = await parseJsonBody(req)

  // Validate method
  methodValidator([RequestMethods.POST], methodSchema.parse(method))

  const cbService = new CatBotService()
  const response = await cbService.generateContent(
    CatBotPayloadSchema.parse(parsedBody).message
  )
  return sendResponse(res, {
    response,
  })
}
