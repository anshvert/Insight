import crypto from "crypto";
import axios from "axios";
import { NextResponse } from "next/server";

const salt_key = process.env.NODE_ENV == "production" ? process.env.PAYMENT_GATEWAY_SALT : '96434309-7796-489d-8924-ab56988a6076';
const merchant_id = process.env.NODE_ENV == "production" ? process.env.PAYMENT_GATEWAY_MERCHANT : "PGTESTPAYUAT86";

export async function POST(req: any) {
    try {
        const searchParams = req.nextUrl.searchParams
        const merchantTransactionId = searchParams.get('id')

        const keyIndex = 1
        const string = `/pg/v1/status/${merchant_id}/${merchantTransactionId}` + salt_key
        const sha256 = crypto.createHash('sha256').update(string).digest('hex')
        const checkSum = sha256 + '###' + keyIndex

        const host = req.headers.get('host') || 'localhost:3000'
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const baseUrl = `${protocol}://${host}`;

        const test_URL = process.env.NODE_ENV == 'production' ? 'https://api.phonepe.com/pg/v1/status' : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status'

        const options = {
            method: 'GET',
            url: `${test_URL}/${merchant_id}/${merchantTransactionId}`,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checkSum,
                'X-MERCHANT-ID': merchant_id
            }
        }

        const response = await axios(options)
        if (response.data.success) {
            return NextResponse.redirect(baseUrl, {
                status: 301
            })
        }
        return NextResponse.redirect(`${baseUrl}/failed`, {
            status: 301
        })
    } catch (err) {
        console.log(err);
    }
}