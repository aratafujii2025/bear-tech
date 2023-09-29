import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'


//To use GOOGLE API, make sure that your .env file has the credential json.

async function listBuckets() {
  try {
    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log('Buckets:');
    buckets.forEach(bucket => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error('ERROR:', err);
  }
}

export async function POST(req, res){
    listBuckets();

    const data = await req.formData();
    const audio = data.get("file");
    console.log("1");
    const {Storage} = require('@google-cloud/storage');
    const storage = new Storage();

    const timestamp = Date.now();
    const filename = `audio-${timestamp}.wav`;

    console.log("2");
    const bucketName = 'bear-tech-bucket';
    const audio_buf = new Buffer.from(await audio.arrayBuffer());
    console.log("3");
    await storage.bucket(bucketName).file(filename).save(audio_buf);

    const gsutilURI = `gs://${bucketName}/${filename}`;
    return NextResponse.json({data: gsutilURI});
}

export async function GET(req, res){
    listBuckets();
    const speech = require('@google-cloud/speech');
    const client = new speech.SpeechClient();
    
    // The path to the remote LINEAR16 file
    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('url')
  
    // The audio file's encoding, sample rate in hertz, and BCP-47 language code
    const audio = {
      uri: query,
    };
    const config = {
      encoding: 'LINEAR16',
      languageCode: 'ja-JP',
    };
    const request = {
      audio: audio,
      config: config,
    };
  
    // Detects speech in the audio fil
    const [response] = await client.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
    console.log(`Transcription: ${transcription}`);
    return NextResponse.json({data: transcription});
}