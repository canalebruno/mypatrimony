import { auth } from "@/auth";
import { connect } from "@/utils/dbConnect/dbConnect";
import Record from "@/utils/schema/RecordSchema";
import { NextResponse } from "next/server";

connect()

type Params = {
    params: Promise<{id: string}>
}

export async function POST(request: Request) {
    const {bank, date, value, user} = await request.json()
    
    try {
        const checkRecord = await Record.findOne({date,bank,user})

        if(checkRecord) {
            return NextResponse.json({success: false, message: "This record already exist."})
        }

        const newRecord = new Record({bank, date, value, user, createdAt: new Date()})

        await newRecord.save()
        return NextResponse.json({success: true, message: "New record saved."})
    } catch (error) {
        return NextResponse.json({success: false, message: `Internal server error. Please try again later.Error: ${error}`})
    }
}

export async function GET() {
    const session = await auth()

    try {
        const allRecords = await Record.find({user: session?.user?.email})

        return NextResponse.json({success: true, data:allRecords})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
        
    }
}

export async function DELETE(request: Request, {params}: Params) {
    const recordId = (await params).id

    try {
        await Record.findByIdAndDelete(recordId)

        return NextResponse.json({success: true, message:"Record deleted succesfully"})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
        
    }
}