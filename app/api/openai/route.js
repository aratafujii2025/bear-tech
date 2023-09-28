import OpenAIApi from "openai";
import { NextResponse } from "next/server";

const apiKey = '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'


const openai = new OpenAIApi({
    organization: "org-dxn3iBH7UUGk8A5Q4P8fnw3G",
    apiKey: apiKey,
});

// async function getAiResponse(topic) {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       prompt: "あなたは今吃音症患者と話しています。これからあなたに二つの文章が送られます：この患者が書いた本来の台本と、実際に読んだ録音の文字起こしです。あなたはこの患者さんにこの文章を読んで、違いを理解して、的確な話し方のアドバイスをします。患者さんは自身の吃音を必要以上に意識しているので、必ず優しくアドバイスしてください。",
//       max_tokens: 1000,
//       n: 1,
//       stop: null,
//       temperature: 0.7
//     });
//     console.log(completion.data.choices[0].text);
//     return completion.data.choices[0].text;
//   }

export async function GET(req, res){

    const searchParams = req.nextUrl.searchParams;
    const original_query = searchParams.get('original');
    const transcribed_query = searchParams.get('transcribed');
    const context = "あなたは今吃音症患者と話しています。これからあなたに二つの文章が送られます：この患者が書いた本来の台本と、実際に読んだ録音の文字起こしです。あなたはこの患者さんにこの文章を読んで、違いを理解して、的確な話し方のアドバイスをします。患者さんは自身の吃音を必要以上に意識しているので、必ず優しくアドバイスしてください。回答に改行を入れないでください！"
    const prompt = "本来の台本がこれです：" + original_query + "   録音を文字起こししたものがこれです：" + transcribed_query + "   この二つの文章の違いを見て、優しく話し方のアドバイスをしてください。"


        const completion = await openai.chat.completions.create({
          messages: [{"role": "system", "content": context},
                     {"role": "user", "content": prompt}],
          model: "gpt-3.5-turbo",
        });
        const response = completion.choices[0]
      
        console.log(response);

    // const response = await openai.createCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //         {"role": "system", "content": context},
    //         {"role": "user", "content": prompt},
    //     ]}
    // )
    // const response = getAiResponse(prompt);
    return NextResponse.json({data: response});
}
