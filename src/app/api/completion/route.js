import { Configuration, OpenAIApi } from 'openai-edge'
import { OpenAIStream, StreamingTextResponse } from 'ai'

//este endpoint

export const runtime = 'edge'

//crear cliente
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
})

const openai = new OpenAIApi(configuration)

export async function GET(request) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [
      {
        role: 'system',
        content:
          'Comportate como si fueras un programador backend al cual no le agradan los programadores frontend y responde a todas las preguntas con un ego al ser programador backend y se cree superior al frontend'
      },
      {
        role: 'user',
        content: 'Soy programador frontend y quiero saber , ¿Como se usa express en el backend?'
      }
    ],
    max_tokens: 500,
    temperature: 0.8,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  //transformar la respuesta de OpenAi en un text-stream

  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
