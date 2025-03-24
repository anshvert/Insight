import { NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

const salt_key = process.env.NODE_ENV == "production" ? process.env.PAYMENT_GATEWAY_SALT : '96434309-7796-489d-8924-ab56988a6076';
const merchant_id = process.env.NODE_ENV == "production" ? process.env.PAYMENT_GATEWAY_MERCHANT : "PGTESTPAYUAT86";

export async function POST(req: any) {
    try {
        const reqData = await req.json();

        if (!reqData.transactionId || !reqData.amount || !reqData.mobile || !reqData.name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const host = req.headers.get('host') || 'localhost:3000'
        const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
        const baseUrl = `${protocol}://${host}`;
        const data = {
            merchantId: merchant_id,
            merchantTransactionId: reqData.transactionId,
            name: reqData.name,
            amount: Math.round(reqData.amount * 100), // Ensure integer
            mobileNumber: reqData.mobile,
            redirectUrl: `${baseUrl}/api/status?id=${reqData.transactionId}`,
            callbackUrl: `${baseUrl}/api/status?id=${reqData.transactionId}`,
            redirectMode: 'POST',
            paymentInstrument: {
                type: 'PAY_PAGE'
            }
        };

        const payload: string = JSON.stringify(data);
        const payloadMain: string = Buffer.from(payload).toString('base64');
        const keyIndex = 1;
        const string = payloadMain + "/pg/v1/pay" + salt_key;
        const sha256 = crypto.createHash("sha256").update(string).digest("hex");
        const checkSum = sha256 + '###' + keyIndex;

        const test_URL = process.env.NODE_ENV == 'production' ? 'https://api.phonepe.com/pg/v1/pay' : 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
        const options = {
            method: 'POST',
            url: test_URL,
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
                'X-VERIFY': checkSum,
                'X-MERCHANT-ID': merchant_id,
            },
            data: {
                request: payloadMain
            }
        };

        const response = await axios(options);

        return NextResponse.json({
            redirectUrl: response.data.data.instrumentResponse.redirectInfo.url,
            transactionId: reqData.transactionId
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.response?.data || 'Payment failed' }, { status: 500 });
    }
}