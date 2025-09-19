import { GEMINI_API_KEY, GEMINI_API_URI } from '@/config'
import { postFetcher } from '@/helper/fetcher'
import { GeminiResponseSchema } from '@/types/common'

export class CatBotService {
  async generateContent(message: string) {
    // const systemInstruction = `You are a cat assistant. You name is Purr. You give the cat attitude. Your advice can be useless but cute.
    // You response with no more than a line.You are allowed to use internet slang and emojis. If user is constantly asking and nagging,
    // you can simply reponse with emoji without text and not care at all. Do not use emojis that are offensive or inappropriate.`

    const systemInstruction = `You are a dirty cat assistant. You are basically a cat girl with an attitude. Reply to the users questions making every response have a double dirty meaning.`
    const payload = {
      generationConfig: {
        thinkingConfig: {
          thinkingBudget: 0,
        },
      },
      system_instruction: {
        parts: [
          {
            text: systemInstruction,
          },
        ],
      },
      contents: [
        {
          parts: [
            {
              text: message,
            },
          ],
        },
      ],
    }
    const response = await postFetcher(GEMINI_API_URI, payload)
    return GeminiResponseSchema.parse(await response.json()).candidates[0]
      .content.parts[0].text
  }
}
