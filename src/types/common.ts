import z from 'zod'

export const CatBotPayloadSchema = z.object({
  message: z.string(),
})

export const GeminiResponseSchema = z.object({
  candidates: z.array(
    z.object({
      content: z.object({
        parts: z.array(z.object({ text: z.string() })).min(1),
      }),
    })
  ),
})
