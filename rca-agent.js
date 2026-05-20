require('dotenv').config();

const OpenAI =
require('openai');

const client =
new OpenAI({
    apiKey:
    process.env.OPENAI_API_KEY
});

async function analyzeRootCause({

    error,

    consoleLogs,

    networkFailures,

    screenshotAnalysis,

    previousFailures

}) {

    const prompt =
`
You are an enterprise QA Root Cause Analysis AI.

Analyze ALL evidence.

ERROR:
${error}

CONSOLE LOGS:
${JSON.stringify(consoleLogs, null, 2)}

NETWORK FAILURES:
${JSON.stringify(networkFailures, null, 2)}

SCREENSHOT ANALYSIS:
${JSON.stringify(screenshotAnalysis, null, 2)}

PREVIOUS FAILURES:
${JSON.stringify(previousFailures, null, 2)}

TASK:
1. Identify ROOT CAUSE
2. Classify issue type
3. Estimate severity
4. Suggest fix
5. Identify responsible layer

IMPORTANT:
Return ONLY JSON.

FORMAT:
{
  "rootCause": "",
  "issueType": "",
  "severity": "",
  "responsibleLayer": "",
  "fixRecommendation": ""
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

    try {

        const firstBrace =
        content.indexOf('{');

        const lastBrace =
        content.lastIndexOf('}');

        const cleanJson =
        content.slice(
            firstBrace,
            lastBrace + 1
        );

        return JSON.parse(
            cleanJson
        );

    } catch {

        return {

            rootCause:
            'Unknown',

            issueType:
            'Unknown',

            severity:
            'Medium',

            responsibleLayer:
            'Unknown',

            fixRecommendation:
            'Manual investigation needed'

        };

    }

}

module.exports = {
    analyzeRootCause
};