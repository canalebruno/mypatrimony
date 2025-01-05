import mongoose from "mongoose"

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URL as string)
        const connection = mongoose.connection
        return connection
    } catch (error) {
        console.log(`Error connecting to the Database. Error: ${error}`)
    }
}