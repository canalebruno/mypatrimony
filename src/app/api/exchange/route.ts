import { connect } from "@/utils/dbConnect/dbConnect";
import Exchange from "@/utils/schema/ExchangeSchema";
import { NextResponse } from "next/server";

connect()

export async function POST(request: Request) {
    const {date, value} = await request.json()
    
    try {
        const checkRecord = await Exchange.findOne({date})
        
        if(checkRecord) {
            return NextResponse.json({success: false, message: "This record already exist."})
        }

        const newRecord = new Exchange({date, value})

        await newRecord.save()
        return NextResponse.json({success: true, message: "New record saved."})
    } catch (error) {
        return NextResponse.json({success: false, message: `Internal server error. Please try again later. Error: ${error}`})
    }
}

export async function GET() {
    try {
        const allRecords = await Exchange.find()

        return NextResponse.json({success: true, data:allRecords})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
        
    }
}