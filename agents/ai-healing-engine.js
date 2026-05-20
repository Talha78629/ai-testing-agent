require('dotenv').config();

const OpenAI = require('openai');
const cheerio = require('cheerio');

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

async function aiHealSelector(
    failedSelector,
    html
) {

    const $ = cheerio.load(html);

    // Extract candidate elements
    const candidates = [];

    $('button, input, a').each((i, el) => {

        candidates.push({
            tag: el.tagName,
            id: $(el).attr('id'),
            name: $(el).attr('name'),
            text: $(el).text().trim(),
            type: $(el).attr('type')
        });

    });

    const prompt = `
You are an AI selector healing engine.

A Playwright selector failed.

FAILED SELECTOR:
${failedSelector}

AVAILABLE ELEMENTS:
${JSON.stringify(candidates, null, 2)}

TASK:
Suggest the BEST replacement selector.

IMPORTANT:
Return ONLY valid JSON.

FORMAT:
{
  "strategy": "",
  "selector": ""
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
    aiHealSelector
};