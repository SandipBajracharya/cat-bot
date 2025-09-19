import { sendResponse } from '@/helper/response'
import type { Req, Res } from '@/types/http'
import httpStatus from 'http-status'
import z, { ZodError } from 'zod'

type RequestHandler = (req: Req, res: Res) => Promise<Res>

// export function withMethodValidator(
//   handler: RequestHandler,
//   allowedMethods: string[]
// ) {
//   return async (req: any, res: any) => {
//     const { method } = req
//     if (!allowedMethods.includes(method)) {
//       return sendResponse(
//         res,
//         {
//           error: 'Method not allowed',
//         },
//         httpStatus.METHOD_NOT_ALLOWED
//       )
//     }
//     return await handler(req, res)
//   }
// }

export function withErrorHandler(handler: RequestHandler) {
  return async (req: any, res: any) => {
    try {
      return await handler(req, res)
    } catch (err: unknown) {
      let payload = { error: 'Internal Server Error' },
        status: number = httpStatus.INTERNAL_SERVER_ERROR
      if (err instanceof ZodError) {
        payload = { error: z.prettifyError(err) }
        status = httpStatus.UNPROCESSABLE_ENTITY
      } else if (err instanceof Error) {
        payload = { error: err.message || 'Internal Server Error' }
      }
      return sendResponse(res, payload, status)
    }
  }
}
