require('dotenv').config()

const OpenAI =
require('openai')

const client =
new OpenAI({
  apiKey:
    process.env.OPENAI_API_KEY
})

async function aiHealSelector(
  failedSelector,
  html
) {

  const prompt = `
A Playwright selector failed.

Failed selector:
${failedSelector}

Here is the HTML:

${html}

Find the BEST CSS selector.

Return ONLY JSON:

{
  "selector": ""
}
`

  const response =
    await client.chat.completions.create({

      model: 'gpt-4.1-mini',

      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]

    })

  const content =
    response.choices[0]
    .message.content
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()

  return JSON.parse(content)

}

module.exports = {
  aiHealSelector
}