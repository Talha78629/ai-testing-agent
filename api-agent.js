require('dotenv').config();

const OpenAI =
require('openai');

const client =
new OpenAI({
    apiKey:
    process.env.OPENAI_API_KEY
});

async function generateApiTests(
    apiData
) {

    const prompt =
`
You are an expert API QA engineer.

Analyze this API:

${JSON.stringify(apiData, null, 2)}

Generate:
1. Positive API tests
2. Negative API tests
3. Edge case tests
4. Security tests
5. Performance validations

IMPORTANT:
Return ONLY JSON array.

FORMAT:
[
  {
    "name": "",
    "method": "",
    "testType": "",
    "validation": ""
  }
]
`;

    const response =
    await client.chat.completions.create({

        model: 'gpt-4.1-mini',

        messages: [
            {
                role: 'user',
                content: prompt
            }
        ]

    });

    let content =
    response.choices[0]
    .message.content;

    content = content
    .replace(/```json/g, '')
    .replace(/```/g, '');

    try {

        const firstBracket =
        content.indexOf('[');

        const lastBracket =
        content.lastIndexOf(']');

        const cleanJson =
        content.slice(
            firstBracket,
            lastBracket + 1
        );

        return JSON.parse(
            cleanJson
        );

    } catch {

        return [];

    }

}

module.exports = {
    generateApiTests
};