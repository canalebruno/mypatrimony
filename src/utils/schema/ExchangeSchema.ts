import mongoose from "mongoose";

const exchangeSchema = new mongoose.Schema({
    date: Date,
    value: Number
})

const Exchange = mongoose.models.exchange || mongoose.model('exchange', exchangeSchema)

export default Exchange