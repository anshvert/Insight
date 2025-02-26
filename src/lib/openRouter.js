import OpenAI from 'openai';

const apiKey = "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"

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    defaultHeaders: {
        'HTTP-Referer': 'Whale.AI',
        'X-Title': 'Whale.AI',
    },
    dangerouslyAllowBrowser: true,
})

async function main() {
    const completion = await openai.chat.completions.create({
        model: 'openai/gpt-3.5-turbo',
        messages: [
            {
                role: 'user',
                content: 'What is the meaning of life?',
            },
        ],
    });
    console.log(completion.choices[0].message);
}

main()
