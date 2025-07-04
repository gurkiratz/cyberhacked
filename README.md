# Cyber Hacked
[![Hackathon Winner](https://img.shields.io/badge/Hackathon%20Winner-blue)](https://dorahacks.io/buidl/21615)
[![RBC Track](https://img.shields.io/badge/RBC%20Track-orange)](https://dorahacks.io/buidl/21615)

CyberHacked AI simulates social engineering attacks to teach you how to spot and avoid scams, phishing, and other online dangers.

## Try it out
https://cyberhacked.co

## Demo Video
[![Cyberhacked Demo Video](https://github.com/user-attachments/assets/0336f902-fd02-4c07-81f9-0ee32130bffd)](https://www.youtube.com/watch?v=4udn6EhEgVs)

## Screenshots
![image](https://github.com/user-attachments/assets/b8348435-c4c3-4ae9-aa81-c3ecf89dc925)
![image](https://github.com/user-attachments/assets/abc88b4b-3d51-41b5-9bab-07364333d0d1)

## Features

- Simulated Social Engineering Scenarios: Engage in realistic conversations with a chatbot that simulates the behavior of a social engineer.
- Interactive Learning: Practice identifying red flags, evaluating information critically, and developing strong security habits.
- Performance Feedback: Receive personalized feedback on your performance, highlighting areas for improvement and providing actionable tips.
- Educational Resources: Access links to helpful resources on cybersecurity topics, such as articles on common scams, tips for protecting your online privacy, and best practices for online safety.

## How its built

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://sdk.vercel.ai/docs)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports Google (default), OpenAI, Anthropic, Cohere, and other model providers
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Vercel Postgres powered by Neon](https://vercel.com/storage/postgres) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient object storage
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
  - Simple and secure authentication

## Model Providers

This template ships with Google Gemini `gemini-1.5-pro` models as the default. However, with the [AI SDK](https://sdk.vercel.ai/docs), you can switch LLM providers to [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://sdk.vercel.ai/providers/ai-sdk-providers) with just a few lines of code.

## Deploy Your Own

You can deploy your own version of the Next.js AI Chatbot to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fgemini-chatbot&env=AUTH_SECRET,GOOGLE_GENERATIVE_AI_API_KEY&envDescription=Learn%20more%20about%20how%20to%20get%20the%20API%20Keys%20for%20the%20application&envLink=https%3A%2F%2Fgithub.com%2Fvercel-labs%2Fgemini-chatbot%2Fblob%2Fmain%2F.env.example&demo-title=Next.js%20Gemini%20Chatbot&demo-description=An%20Open-Source%20AI%20Chatbot%20Template%20Built%20With%20Next.js%20and%20the%20AI%20SDK%20by%20Vercel.&demo-url=https%3A%2F%2Fgemini.vercel.ai&stores=[{%22type%22:%22postgres%22},{%22type%22:%22blob%22}])

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run Next.js AI Chatbot. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various Google Cloud and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).
