import mongoose from "mongoose";

const recordSchema = new mongoose.Schema({
    date: Date,
    bank: Number,
    value: Number,
    user: String,
    createdAt: Date
})

const Record = mongoose.models.records || mongoose.model('records', recordSchema)

export default Record