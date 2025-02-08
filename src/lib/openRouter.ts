import OpenAI from 'openai';

const apiKey = "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"

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    defaultHeaders: {
        'HTTP-Referer': 'Whale.AI',
        'X-Title': 'Whale.AI',
    },
})

async function main() {
    const completion = await openai.chat.completions.create({
        model: 'deepseek/deepseek-r1-distill-llama-8b',
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
