import * as http from 'http'
import type { Req, Res } from '@/types/http'
import { routes as catBotRoutes } from '@/api/catBot/route'
import httpStatus from 'http-status'
import { sendResponse } from './helper/response'

// You can add additional route modules here and mount them
const routes = [catBotRoutes]

export function createServer() {
  const server = http.createServer(async (req: Req, res: Res) => {
    // Basic routing - iterate route handlers until something replies.
    // Each route is responsible for checking method+url and sending response.
    for (const route of routes) {
      // If route doesn't match, continue
      if (route.url !== req.url) continue

      // route will handle the request and call res.end(...)
      await route.handleRoute(req, res)
      // If response already sent, stop processing (simple check)
      if (res.writableEnded) return
    }

    // If we fell through
    if (!res.writableEnded) {
      return sendResponse(
        res,
        {
          error: 'Route not found',
        },
        httpStatus.NOT_FOUND
      )
    }
  })

  return server
}
