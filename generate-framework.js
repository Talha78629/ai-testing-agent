require('dotenv').config();

const OpenAI = require('openai');
const fs = require('fs-extra');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateFramework() {

    const testCases = await fs.readJson('testcases.json');

    // Generate Page Object
    const pomPrompt = `
You are a senior automation engineer.

Generate a Playwright Page Object Model in JavaScript.

Requirements:
- Use class syntax
- Use constructor(page)
- Use Playwright locators
- Add reusable methods
- Return ONLY code
- No markdown

Feature:
Login Page

Test Cases:
${JSON.stringify(testCases, null, 2)}
`;

    const pomResponse =
        await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "user",
                    content: pomPrompt
                }
            ]
        });

    let pomCode =
        pomResponse.choices[0].message.content;

    pomCode = pomCode
        .replace(/```javascript/g, '')
        .replace(/```js/g, '')
        .replace(/```/g, '');

    // Generate Spec File
    const specPrompt = `
You are a senior Playwright automation engineer.

Generate a Playwright test spec using Page Object Model.

Requirements:
- Import LoginPage
- Use Playwright Test
- Use async/await
- Add assertions
- Return ONLY code
- No markdown

Test Cases:
${JSON.stringify(testCases, null, 2)}
`;

    const specResponse =
        await client.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "user",
                    content: specPrompt
                }
            ]
        });

    let specCode =
        specResponse.choices[0].message.content;

    specCode = specCode
        .replace(/```javascript/g, '')
        .replace(/```js/g, '')
        .replace(/```/g, '');

    // Create folders
    await fs.ensureDir('pages');
    await fs.ensureDir('tests');

    // Save files
    await fs.writeFile(
        'pages/LoginPage.js',
        pomCode
    );

    await fs.writeFile(
        'tests/login.spec.js',
        specCode
    );

    console.log('\n✅ Framework generated successfully');
}

generateFramework();