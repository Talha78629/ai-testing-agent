require('dotenv').config();

const { chromium } = require('playwright');
const OpenAI = require('openai');
const fs = require('fs-extra');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateTestCases(scanData) {

    const prompt = `
You are a senior QA engineer.

Based on this UI data:

${JSON.stringify(scanData)}

Generate:
1. Positive test cases
2. Negative test cases
3. Edge cases

IMPORTANT:
Return ONLY valid JSON array.

Format:
[
  {
    "feature": "",
    "type": "",
    "steps": [],
    "expected": ""
  }
]
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

    return response.choices[0].message.content;
}

async function scanWebsite(url) {

    const browser = await chromium.launch({
        headless: false
    });

    const page = await browser.newPage();

    await page.goto(url);

    // Extract buttons
   const buttons = await page.locator('button')
    .evaluateAll(buttons =>
        buttons.map(button => ({
            text: button.innerText.trim(),
            id: button.id,
            type: button.type,
            ariaLabel: button.getAttribute('aria-label'),
            role: button.getAttribute('role')
        }))
    );

    // Extract inputs
    const inputs = await page.locator('input')
    .evaluateAll(inputs =>
        inputs.map(input => ({
            type: input.type,
            name: input.name,
            placeholder: input.placeholder,
            id: input.id,
            ariaLabel: input.getAttribute('aria-label')
        }))
    );

    // Extract links
    const links = await page.locator('a')
        .allTextContents();

    const scanData = {
        buttons,
        inputs,
        links
    };

    console.log("\nSCAN DATA:");
    console.log(scanData);

    // Generate AI test cases
    const aiResponse = await generateTestCases(scanData);

    console.log("\nRAW AI RESPONSE:");
    console.log(aiResponse);

    try {

        // Convert AI response to JSON
        const testCases = JSON.parse(aiResponse);

        // Save JSON file
       await fs.writeJson(
    'testcases.json',
    testCases,
    { spaces: 2 }
);

await fs.writeJson(
    'dom-map.json',
    scanData,
    { spaces: 2 }
);

        console.log("\n✅ testcases.json saved successfully");

    } catch (error) {

        console.log("\n❌ Invalid JSON from AI");
        console.log(error.message);
    }

    await browser.close();
}

scanWebsite(
    'https://practicetestautomation.com/practice-test-login/'
);