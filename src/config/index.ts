import 'dotenv/config'
import z from 'zod'

export const PORT = Number(process.env.PORT || 3000)
export const GEMINI_API_KEY = z.string().parse(process.env.GEMINI_API_KEY)
export const GEMINI_API_URI = z.string().parse(process.env.GEMINI_API_URI)
export const APIFY_API_KEY = z.string().parse(process.env.APIFY_API_KEY)
