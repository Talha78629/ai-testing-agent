require('dotenv').config();

const OpenAI = require('openai');
const fs = require('fs-extra');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateAutomationPlan() {

    const domMap =
        await fs.readJson('dom-map.json');

    const testCases =
        await fs.readJson('testcases.json');

    const prompt = `
You are a senior QA automation architect.

Generate a structured automation plan.

IMPORTANT RULES:
- Return ONLY valid JSON
- No markdown
- Use ONLY selectors from DOM MAP
- Do NOT invent selectors
- Do NOT invent features

FORMAT:
[
  {
    "testName": "",
    "steps": [
      {
        "action": "goto",
        "url": ""
      },
      {
        "action": "fill",
        "selector": "",
        "value": ""
      },
      {
        "action": "click",
        "selector": ""
      },
      {
        "action": "assertUrl",
        "value": ""
      }
    ]
  }
]

APPLICATION URL:
https://practicetestautomation.com/practice-test-login/

DOM MAP:
${JSON.stringify(domMap, null, 2)}

TEST CASES:
${JSON.stringify(testCases, null, 2)}
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

    let plan =
        response.choices[0].message.content;

    plan = plan
        .replace(/```json/g, '')
        .replace(/```/g, '');

    try {

        const parsedPlan =
            JSON.parse(plan);

        await fs.writeJson(
            'automation-plan.json',
            parsedPlan,
            { spaces: 2 }
        );

        console.log(
            '\n✅ automation-plan.json generated'
        );

    } catch (error) {

        console.log(
            '\n❌ Invalid automation JSON'
        );

        console.log(error.message);
    }
}

generateAutomationPlan();