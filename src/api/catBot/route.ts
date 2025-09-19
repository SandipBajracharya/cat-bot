import { catBot } from '@/api/catBot/catBot.controller'
import { withErrorHandler } from '@/hoc/withErrorHandler'

export const routes = {
  handleRoute: withErrorHandler(catBot),
  url: '/api/cat-bot',
}
