import { NextApiRequest, NextApiResponse } from 'next';
import { OpenAIApi } from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const apiKey = process.env.NEXT_PUBLIC_OPENAI_API_KEY || '';
  const prompt =
    'Generate bio of a full stack developer named John who works with React, Next.js, and TypeScript.';
  const openaiInstance = new OpenAIApi({
    apiKey,
    isJsonMime(mime) {
      return mime === 'application/json';
    },
  });
  const response = await openaiInstance.createChatCompletion({
    model: 'davinci',
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
    max_tokens: 100,
    messages: [
      {
        content: prompt,
        role: 'user',
      },
    ],
  });
  console.log('RESPONSE....', response.status);
  res.setHeader('Content-Type', 'application/json');
  res.status(200).send({ response });
}
