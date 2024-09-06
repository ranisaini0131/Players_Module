import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}DemoProjectDatabase`,
            { useNewUrlParser: true, useUnifiedTopology: true })

        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`)
    } catch (error) {
        console.log(`MONGODB connection error: `, error)
        process.exit(1)
    }
}

export default connectDb