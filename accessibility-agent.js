require('dotenv').config();

const OpenAI =
require('openai');

const client =
new OpenAI({
    apiKey:
    process.env.OPENAI_API_KEY
});

async function analyzeAccessibility(
    violations
) {

    const prompt =
`
You are an accessibility QA expert.

Analyze these WCAG violations:

${JSON.stringify(violations, null, 2)}

TASK:
1. Explain each issue
2. Estimate severity
3. Suggest remediation
4. Identify affected users

IMPORTANT:
Return ONLY JSON array.

FORMAT:
[
  {
    "issue": "",
    "severity": "",
    "affectedUsers": "",
    "fixRecommendation": ""
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
    analyzeAccessibility
};