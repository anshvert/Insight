import OpenAI from 'openai';

const apiKey = process.env.NEXT_PUBLIC_OPEN_ROUTER_API_KEY

export const openai = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: apiKey,
    defaultHeaders: {
        'HTTP-Referer': 'Whale.AI',
        'X-Title': 'Whale.AI',
    },
    dangerouslyAllowBrowser: true,
})

// async function main() {
//     const completion = await openai.chat.completions.create({
//         model: 'openai/gpt-3.5-turbo',
//         messages: [
//             {
//                 role: 'user',
//                 content: 'What is the meaning of life?',
//             },
//         ],
//     });
//     console.log(completion.choices[0].message);
// }
//
// main()
