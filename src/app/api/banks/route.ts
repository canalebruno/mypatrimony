import { connect } from "@/utils/dbConnect/dbConnect"
import Banks from "@/utils/schema/BankSchema"
import { NextResponse } from "next/server"

connect()

export async function GET() {
    try {
        const allBanks = await Banks.find()
        return NextResponse.json({success: true, data:allBanks})
    } catch (error) {
        return NextResponse.json({success: false, message: `No data found. Error: ${error}`})
    }
}