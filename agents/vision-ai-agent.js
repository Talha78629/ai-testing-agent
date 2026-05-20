require('dotenv').config();

const OpenAI = require('openai');
const fs = require('fs-extra');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function analyzeScreenshot(
    imagePath
) {

    const base64Image =
        await fs.readFile(
            imagePath,
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
You are an expert UI QA engineer.

Analyze this screenshot.

Find:
1. Layout issues
2. Missing UI elements
3. Broken alignment
4. Overlapping components
5. Visual bugs
6. Accessibility concerns

Return ONLY JSON.

FORMAT:
{
  "issues": [
    {
      "severity": "",
      "problem": "",
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
`data:image/png;base64,${base64Image}`
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

    return JSON.parse(content);

}

module.exports = {
    analyzeScreenshot
};