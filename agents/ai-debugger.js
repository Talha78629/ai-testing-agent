require('dotenv').config();

const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function debugFailure(
    errorMessage,
    testCode
) {

    const prompt = `
You are an expert Playwright debugging AI.

A Playwright test failed.

ERROR:
${errorMessage}

TEST CODE:
${testCode}

TASK:
1. Explain WHY failure happened
2. Suggest EXACT fix
3. Return ONLY JSON

FORMAT:
{
  "reason": "",
  "fix": "",
  "updatedCode": ""
}
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

    return JSON.parse(content);

}

module.exports = {
    debugFailure
};