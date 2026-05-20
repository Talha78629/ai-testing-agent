require('dotenv').config();

const OpenAI =
require('openai');

const cheerio =
require('cheerio');

const client =
new OpenAI({
    apiKey:
    process.env.OPENAI_API_KEY
});

async function planNextAction(
    html,
    history
) {

    const $ = cheerio.load(html);

    const buttons = [];

    $('button').each((i, el) => {

        buttons.push({
            text: $(el).text().trim(),
            id: $(el).attr('id')
        });

    });

    const links = [];

    $('a').each((i, el) => {

        links.push({
            text: $(el).text().trim(),
            href: $(el).attr('href')
        });

    });

    const inputs = [];

    $('input').each((i, el) => {

        inputs.push({
            id: $(el).attr('id'),
            name: $(el).attr('name'),
            type: $(el).attr('type')
        });

    });

    const prompt =
`
You are an autonomous QA exploration agent.

CURRENT PAGE ELEMENTS:

BUTTONS:
${JSON.stringify(buttons, null, 2)}

LINKS:
${JSON.stringify(links, null, 2)}

INPUTS:
${JSON.stringify(inputs, null, 2)}

PREVIOUS ACTIONS:
${JSON.stringify(history, null, 2)}

TASK:
Choose the BEST next exploratory action.

RULES:
- Avoid repeating actions
- Explore meaningful flows
- Prioritize forms/buttons/navigation

Return ONLY JSON.

FORMAT:
{
  "action": "",
  "target": "",
  "reason": ""
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

        return JSON.parse(content);

    } catch {

        return {
            action: 'click',
            target: '#submit',
            reason: 'fallback'
        };

    }

}

module.exports = {
    planNextAction
};