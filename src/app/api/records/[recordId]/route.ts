import Record from "@/utils/schema/RecordSchema"
import { connect } from "@/utils/dbConnect/dbConnect";
import { NextResponse } from "next/server"

connect()

type Params = {
    params: Promise<{recordId: string}>
}

export async function GET(request: Request, {params}: Params) {
    const recordId = (await params).recordId

    try {
        const allRecords = await Record.findOne({_id:recordId})

        return NextResponse.json({success: true, data:allRecords})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
        
    }
}

export async function DELETE(request: Request, {params}: Params) {
    const recordId = (await params).recordId

    try {
        await Record.findByIdAndDelete(recordId)

        return NextResponse.json({success: true, message:"Record deleted succesfully"})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
        
    }
}

export async function PUT(request: Request, {params}: Params) {
    const recordId = (await params).recordId
    const {value} = await request.json()

    try {
        await Record.findByIdAndUpdate(recordId,{value:value})

        return NextResponse.json({success: true, message:"Record deleted succesfully"})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
        
    }
}