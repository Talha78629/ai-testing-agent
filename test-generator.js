require('dotenv').config();

const OpenAI = require('openai');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function generateTestCases(scanData) {

    const prompt = `
You are a senior QA engineer.

Based on the UI information below:

${JSON.stringify(scanData)}

Generate:
1. Positive test cases
2. Negative test cases
3. Edge cases

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

    console.log(response.choices[0].message.content);
}

const sampleData = {
    buttons: ["Login", "Signup"],
    inputs: ["email", "password"]
};

generateTestCases(sampleData);