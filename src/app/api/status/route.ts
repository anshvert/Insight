import crypto from "crypto";
import axios from "axios";
import { NextResponse } from "next/server";

const salt_key = '96434309-7796-489d-8924-ab56988a6076';
const merchant_id = "PGTESTPAYUAT86";

export async function POST(req: any) {
    try {
        const searchParams = req.nextUrl.searchParams
        const merchantTransactionId = searchParams.get('id')
        const keyIndex = 1
        const string = `/pg/v1/status/${merchant_id}/${merchantTransactionId}` + salt_key
        const sha256 = crypto.createHash('sha256').update(string).digest('hex')
        const checkSum = sha256 + '###' + keyIndex

        const options = {
            method: 'GET',
            url: `https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status/${merchant_id}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checkSum,
                'X-MERCHANT-ID': merchant_id
            }
        }

        const response = await axios(options)
        if (response.data.success) {
            return NextResponse.redirect('http://localhost:3000', {
                status: 301
            })
        }
        return NextResponse.redirect('http://localhost:3000/failed', {
            status: 301
        })
    } catch (err) {
        console.log(err);
    }
}