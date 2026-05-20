require('dotenv').config();

const OpenAI = require('openai');
const fs = require('fs-extra');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function compareScreenshots(
    baselinePath,
    newPath
) {

    const baseline =
        await fs.readFile(
            baselinePath,
            {
                encoding: 'base64'
            }
        );

    const updated =
        await fs.readFile(
            newPath,
            {
                encoding: 'base64'
            }
        );

    const response =
        await client.chat.completions.create({

            model: 'gpt-4.1-mini',

            messages: [

                {
                    role: 'user',

                    content: [

                        {
                            type: 'text',

                            text:
`
You are an expert visual QA engineer.

Compare these two screenshots.

TASK:
1. Identify visual differences
2. Detect regressions
3. Identify layout shifts
4. Identify missing/broken UI
5. Classify severity

Return ONLY JSON.

FORMAT:
{
  "regressions": [
    {
      "severity": "",
      "issue": "",
      "recommendation": ""
    }
  ]
}
`
                        },

                        {
                            type: 'image_url',

                            image_url: {
                                url:
`data:image/png;base64,${baseline}`
                            }
                        },

                        {
                            type: 'image_url',

                            image_url: {
                                url:
`data:image/png;base64,${updated}`
                            }
                        }

                    ]
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

    return JSON.parse(cleanJson);

} catch (error) {

    console.log(
        '\n❌ JSON Parse Failed'
    );

    console.log(content);

    return {
        regressions: [
            {
                severity: 'unknown',
                issue: 'AI returned invalid JSON',
                recommendation:
                    'Check raw AI response'
            }
        ]
    };

}

}

module.exports = {
    compareScreenshots
};