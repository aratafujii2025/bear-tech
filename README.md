## Getting Started

### Dependencies to Download

npm install --save @google-cloud/speech
npm install dotenv
npm install openai
npm install axios
npm install @google-cloud/storage

### API credentials
You need to input your API credentials for three services:
1. Cleanvoice API 
    Make a Cleanvoice account and enter your APIKey into `/api/cleanvoice/route.js`
2. OpenAI API
    Make a OpenAI account, add credits, and enter your APIKey and organization ID into `/api/openai/route.js`
3. Google API
    Make a Google Cloud account, and add your credential json into the root directory. Then add the path to your credential json to `.env`

### Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
