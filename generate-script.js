require('dotenv').config();

const OpenAI = require('openai');
const fs = require('fs-extra');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generatePlaywrightScript() {

    // Read generated test cases
    const testCases = await fs.readJson('testcases.json');

const prompt = `
You are a senior automation engineer.

Generate a Playwright test script using the provided DOM information and test cases.

RULES:
- Use JavaScript
- Use Playwright Test
- Use valid selectors from DOM data
- Prefer:
  page.locator('#id')
- Add assertions
- Use async/await
- Return ONLY code
- No markdown

TEST CASES:
${JSON.stringify(testCases, null, 2)}
`;

    const response = await client.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
            {
                role: "user",
                content: prompt
            }
        ]
    });

   let script = response.choices[0].message.content;

script = script
    .replace(/```javascript/g, '')
    .replace(/```js/g, '')
    .replace(/```/g, '');

    // Save generated test
    await fs.writeFile(
        'generated-tests/login.spec.js',
        script
    );

    console.log('\n✅ Playwright script generated');
}

generatePlaywrightScript();