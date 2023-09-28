import axios from "axios";
import * as fs from "fs";
import { NextResponse } from "next/server";
import { NextRequest } from 'next/server'

export const config = {
    api:{
        bodyParser: false
    }
};

export async function POST(req, res){
    console.log("0");
    const apiKey = '7arRxEUsePXWVZk6EMr5fUVS7BpsdpdP'; 
    const data = await req.formData();
    console.log("1");

    //step1 keys
    const url = 'https://api.cleanvoice.ai/v1/upload?filename=audio.mp3';
    const headers = {'X-API-Key': apiKey};
    const response = await axios.post(url, null, {headers});
    const signed_url = response.data.signedUrl;
    console.log("2");
    console.log(signed_url);

    //step2 upload
    const file = data.get("file");
    await axios.put(signed_url, await file.arrayBuffer())
    console.log("3");

    //step3 edit
    const data_2 = {
        input: {
            files: [signed_url],
            config: {ignore_features:["STUTTERING"]}
        }
    };

    const headers_2 = {
        "X-API-Key": apiKey,
        "Content-Type": "application/json"
    };

    let retrieve_url = "https://api.cleanvoice.ai/v1/edits/";
    const response2 = await axios.post("https://api.cleanvoice.ai/v1/edits", data_2, {headers: headers_2});
    console.log("4");

    retrieve_url += response2.data.id;
    console.log(retrieve_url + "POST")

    //step4 retrieve
    //const response3 = await axios.get(retrieve_url, { headers })

    // TODO: return only retrieve url -> from front call get.
    // console.log("5");

    // console.log(response3.data.status);

    return NextResponse.json({data: retrieve_url});
}

export async function GET(req, res){
    const apiKey = 'bkBKpGbsNwQR57tLsLpv2ZApdZN7kd6S';
    const headers = {'X-API-Key': apiKey};

    const searchParams = req.nextUrl.searchParams
    const query = searchParams.get('url')
    const retrieve_url = query;
    const new_response = await axios.get(retrieve_url, { headers });
    const status = new_response.data.status;

    if(status == "SUCCESS"){
        return NextResponse.json({data:{status: status, url: new_response.data.result.download_url}});
    }else{
        return NextResponse.json({data: {status: status, url: null}});
    }
}

