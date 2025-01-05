import mongoose from "mongoose";

const bankSchema = new mongoose.Schema({
    id: Number,
    name: String,
    currency: String
})

const Banks = mongoose.models.banks || mongoose.model('banks', bankSchema)

export default Banks